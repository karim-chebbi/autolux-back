const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

require("dotenv").config()



const PORT = process.env.PORT || process.env.PORT_2;

app.listen(PORT, (err) => {
    err
      ? console.log(err)
      : console.log(`⚡⚡⚡ Server is running at http://127.0.0.1:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('<h1>Welcome to AutoLux Server</h1>')
})


const connectDB = require('./config/connectDB')

connectDB()
 

app.use('/api/cars', require('./routes/carRoutes'))

app.use('/api/auth', require('./routes/authRoures'))
