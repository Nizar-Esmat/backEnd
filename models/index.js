// src/models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};

// Import models
db.User = require("./user")(sequelize, DataTypes);
db.Conversation = require("./conversation")(sequelize, DataTypes);
db.ConversationMember = require("./conversationMember")(sequelize, DataTypes);
db.Message = require("./message")(sequelize, DataTypes);

// Run associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
