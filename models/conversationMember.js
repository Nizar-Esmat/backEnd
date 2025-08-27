// src/models/conversationMember.js
module.exports = (sequelize, DataTypes) => {
  const ConversationMember = sequelize.define("ConversationMember", {});
  return ConversationMember;
};
