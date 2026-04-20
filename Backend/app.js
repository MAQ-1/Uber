const express=require('express');
const app= express();
const dotenv=require('dotenv');
dotenv.config();
const cors= require('cors');
const connectDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.route');
const mapsRoutes = require('./routes/maps.route');
const rideRoutes = require('./routes/ride.routes');
connectDB();


app.use(cookieParser());


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://678km3bn-5173.inc1.devtunnels.ms', process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);

app.get('/',(req,res)=>{
    res.send("Hello Bhai log kaise ho")
});

module.exports =app;