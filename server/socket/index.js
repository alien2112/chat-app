const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const app = express();

/***socket connection***/

const server = http.createServer(app);
const io = new Server(server);

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("user connected", socket.id);
  const token = socket.handshake.auth.token;
  //current user details
  const user = await getUserDetailsFromToken(token);
  //creating room
  socket.join(user?._id);
  onlineUser.add(user?._id);
  console.log("token", token);

  io.emit("onlineUser", Array.from(onlineUser));
  socket.on("message-page", async (userId) => {
    console.log("userId", userId);
    const userDetails = await User.findById(userId).select("-password");
    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      profile_pic:userDetails?.profile_pic,
      email: userDetails?.email,
      online: onlineUser.has(userId),
    };
    socket.emit("message-user", payload);
  });

  //new message
  socket.on("new-message",async(data)=>{
    
    //check conversation is available for both users
    let conversation = await Conversation.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    });
    //if conversation isn't available 
    if(!conversation){
        const createConversation = await Conversation({
          sender: data?.sender,
          receiver: data?.receiver,
        });
        conversation = await createConversation.save();
    }
    const message = await Message({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: data?.msgByUserId,
    });
    const saveMessage = await Message.save();
    const updateConversation = await Conversation.updateOne({_id:conversation?._id},{
      "$push":{message:saveMessage?._id},
    });
    const getConversationMessage = await Conversation.findOne({
      $or: [
        { sender: data?.sender, receiver: data?.receiver },
        { sender: data?.receiver, receiver: data?.sender },
      ],
    }).populate('messages').sort({updateAt:-1})
  })
  io.to(data?.sender).emit("message", getConversationMessage.messages);
  io.to(data?.receiver).emit("message", getConversationMessage.messages);

//send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation',conversationSender)
        io.to(data?.receiver).emit('conversation',conversationReceiver)
    


    //sidebar
    socket.on('sidebar',async(currentUserId)=>{
        console.log("current user",currentUserId)

        const conversation = await getConversation(currentUserId)

        socket.emit('conversation',conversation)
        
    })

    socket.on('seen',async(msgByUserId)=>{
        
        let conversation = await ConversationModel.findOne({
            "$or" : [
                { sender : user?._id, receiver : msgByUserId },
                { sender : msgByUserId, receiver :  user?._id}
            ]
        })

        const conversationMessageId = conversation?.messages || []

        const updateMessages  = await MessageModel.updateMany(
            { _id : { "$in" : conversationMessageId }, msgByUserId : msgByUserId },
            { "$set" : { seen : true }}
        )

        //send conversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(msgByUserId)

        io.to(user?._id?.toString()).emit('conversation',conversationSender)
        io.to(msgByUserId).emit('conversation',conversationReceiver)
    })

  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("user disconnected", socket.id);
  });
});

module.exports = { app, server };
