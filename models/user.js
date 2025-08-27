// src/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    avatarUrl: { type: DataTypes.STRING, allowNull: true },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Conversation, {
      through: models.ConversationMember,
      foreignKey: "userId",
    });
    User.hasMany(models.Message, { foreignKey: "senderId" });
  };

  return User;
};
