const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const messagRoutes = require('./routes/messagesRoute');

const socket = require('socket.io');

// create express app
const app = express();
// Enviorenment varibale configuration to read env data
dotenv.config();

// middleware to rescues CORS, JSON, backend route
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagRoutes);

//connect to mongoDB through Mongoose
mongoose.connect(process.env.MONGO_CLOUD_URL)
        .then(()=> {
            console.log("MongoDB Connected!");
        })
        .catch((err) => {
            console.log(`DB connection failed ${err.message}`);
        })

app.get('/', (req, res) => {
    res.send("<h1>Welcome to snappy</h1>")
});


const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server started at PORT ${process.env.PORT}`);
})

// socket
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);

    });

    socket.on("send-message",(data) => {
       const sendUserSocket = onlineUsers.get(data.to); 
       if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});

