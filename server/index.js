const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');

// create express app
const app = express();
// Enviorenment varibale configuration to read env data
dotenv.config();

// middle ware to rescues CORS, JSON
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

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
