# Zytronic Backend

A Node.js backend application for a real-time chat system built with Express.js, Socket.IO, and MySQL.

## Features

- **User Authentication**: Register and login functionality with JWT tokens
- **Real-time Chat**: Socket.IO integration for instant messaging
- **Database Integration**: MySQL database with Sequelize ORM
- **RESTful API**: Express.js REST API endpoints
- **Security**: Password hashing with bcrypt
- **CORS Support**: Cross-origin resource sharing enabled

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Real-time**: Socket.IO
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Development**: Nodemon for auto-restart

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MySQL (or use the provided Docker setup)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=chat_app
   DB_USER=myuser
   DB_PASSWORD=mypassword
   ```

4. **Start the database**
   Using Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. **Run the application**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or your specified PORT).

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

## Project Structure

```
backEnd/
├── controllers/          # Business logic controllers
│   ├── authControllers.js
│   └── chatController.js
├── middleware/           # Custom middleware
│   ├── dbConnextion.js
│   └── socketAuth.js
├── models/              # Database models
│   ├── conversation.js
│   ├── conversationMember.js
│   ├── message.js
│   ├── user.js
│   └── index.js
├── routers/             # API route definitions
│   └── authRouter.js
├── docker-compose.yml   # Docker configuration
├── index.js            # Application entry point
└── package.json        # Dependencies and scripts
```

## Database Models

- **User**: User accounts and authentication
- **Conversation**: Chat room/conversation data
- **ConversationMember**: Users participating in conversations
- **Message**: Individual chat messages

## Development

The application uses Nodemon for development, which automatically restarts the server when files change.

```bash
npm start
```

## Docker Support

The project includes Docker Compose configuration for easy database setup:

```bash
# Start MySQL database
docker-compose up -d

# Stop database
docker-compose down
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Author

Zytronic Team
