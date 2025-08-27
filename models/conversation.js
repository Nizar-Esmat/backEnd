// src/models/conversation.js
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {});

  Conversation.associate = (models) => {
    Conversation.belongsToMany(models.User, {
      through: models.ConversationMember,
      foreignKey: "conversationId",
    });
    Conversation.hasMany(models.Message, { foreignKey: "conversationId" });
  };

  return Conversation;  
};
