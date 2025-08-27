const db = require('./models')
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require('http')
const chatController = require('./controllers/chatController')
const app = express()


const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
dotenv.config();

app.use(express.json())
app.use(cors())


app.use('/auth', require('./routers/authRouter'))

chatController(io);


db.sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized')
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`)
    })
  })