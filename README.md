# Real-Time Chat Api
This API powers a live messaging platform using Node.js and sockets, allowing users to connect, communicate, and build social connections.

## Features

### Real-Time Messaging
- **Instant Messaging**: Leverages WebSockets for real-time communication between users.
- **Typing Indicators**: Notifies when the other user is typing.
- **Read Receipts**: Shows when messages have been seen.

### User Registration
- **Sign Up**: Register new users with unique usernames and secure password storage.
- **Login**: Secure login system using token-based authentication.

### User Search
- **Search Users**: Find other users by username or other criteria.
- **Friend Suggestions**: Recommendations based on mutual connections or recent searches.

### Favorites Management
- **Add to Favorites**: Easily add frequently contacted users to a favorites list for quick access.
- **Remove from Favorites**: Manage your favorite list by adding or removing contacts.

## Getting Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your machine.
- **MongoDB**: A MongoDB database for storing user data and chat history.

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/alien2112/chat-app.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd chat-app
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**  
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
5. **Start the server:**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- **Register**: `POST /register` - Register a new user.
- **Check Email**: `POST /email` - Check if an email is already registered.
- **Login**: `POST /login` - Log in with email and password.
- **Logout**: `GET /logout` - Log out the current user.

### User Management
- **User Details**: `GET /user-details` - Retrieve details of the logged-in user.
- **Update User**: `POST /update-user` - Update user details.
- **Search Users**: `POST /search-user` - Search for users by criteria.

### Favorites
- **Add to Favorites**: `POST /add-favorite` - Add a user to the favorites list.
- **Get Favorites**: `GET /favorites` - Retrieve the list of favorite users.

## Technologies Used
- **Node.js**: Backend server for handling API requests and real-time events.
- **Socket.io**: WebSockets for live communication.
- **MongoDB**: Database for user data and chat logs.
- **JWT**: Token-based authentication for secure user sessions.
