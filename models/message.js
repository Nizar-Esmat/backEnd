// src/models/message.js
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    content: { type: DataTypes.TEXT, allowNull: false },
    type: {
      type: DataTypes.ENUM("text", "image"),
      defaultValue: "text",
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: "senderId" });
    Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
  };

  return Message;
};
