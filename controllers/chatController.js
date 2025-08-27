const { Message, User, Conversation } = require('../models');
const authenticateSocket = require('../middleware/socketAuth');

const chatController = (io) => {
  // Add authentication middleware
  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}, UserId: ${socket.userId}`);

    // Join a conversation room
    socket.on('join_conversation', async (conversationId) => {
      try {
        // Verify user is part of this conversation
        const conversation = await Conversation.findByPk(conversationId, {
          include: [{
            model: User,
            where: { id: socket.userId }
          }]
        });

        if (!conversation) {
          return socket.emit('error', { message: 'Access denied to this conversation' });
        }

        socket.join(conversationId);
        console.log(`User ${socket.userId} joined conversation ${conversationId}`);
      } catch (error) {
        console.error('Error joining conversation:', error);
        socket.emit('error', { message: 'Failed to join conversation' });
      }
    });

    // Leave a conversation room
    socket.on('leave_conversation', (conversationId) => {
      socket.leave(conversationId);
      console.log(`User ${socket.id} left conversation ${conversationId}`);
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
      try {
        const { conversationId, messageText } = data;
        const senderId = socket.userId; // Get userId from authenticated socket
        
        // Verify user is part of this conversation
        const conversation = await Conversation.findByPk(conversationId, {
          include: [{
            model: User,
            where: { id: senderId }
          }]
        });

        if (!conversation) {
          return socket.emit('error', { message: 'Access denied to this conversation' });
        }

        // Save message to database using your Message model
        const newMessage = await Message.create({
          conversationId: conversationId,
          senderId: senderId,
          messageText: messageText,
          timestamp: new Date()
        });

        // Get sender info for the response
        const sender = await User.findByPk(senderId, {
          attributes: ['id', 'username', 'avatarUrl']
        });

        const messageData = {
          id: newMessage.id,
          messageText: newMessage.messageText,
          timestamp: newMessage.timestamp,
          conversationId: newMessage.conversationId,
          sender: sender
        };

        // Send message to all users in the conversation room
        io.to(conversationId).emit('receive_message', messageData);
        
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing', async (data) => {
      try {
        const { conversationId } = data;
        const userId = socket.userId;
        
        // Get user info
        const user = await User.findByPk(userId, {
          attributes: ['username']
        });
        
        socket.to(conversationId).emit('user_typing', { username: user.username });
      } catch (error) {
        console.error('Error handling typing:', error);
      }
    });

    socket.on('stop_typing', async (data) => {
      try {
        const { conversationId } = data;
        const userId = socket.userId;
        
        // Get user info
        const user = await User.findByPk(userId, {
          attributes: ['username']
        });
        
        socket.to(conversationId).emit('user_stop_typing', { username: user.username });
      } catch (error) {
        console.error('Error handling stop typing:', error);
      }
    });

    // Get conversation messages
    socket.on('get_messages', async (data) => {
      try {
        const { conversationId } = data;
        const userId = socket.userId;
        
        // Verify user is part of this conversation
        const conversation = await Conversation.findByPk(conversationId, {
          include: [{
            model: User,
            where: { id: userId }
          }]
        });

        if (!conversation) {
          return socket.emit('error', { message: 'Access denied to this conversation' });
        }
        
        const messages = await Message.findAll({
          where: { conversationId },
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'username', 'avatarUrl']
          }],
          order: [['createdAt', 'ASC']]
        });

        socket.emit('conversation_messages', { conversationId, messages });
      } catch (error) {
        console.error('Error getting messages:', error);
        socket.emit('message_error', { error: 'Failed to get messages' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}, UserId: ${socket.userId}`);
    });
  });
};

module.exports = chatController;
