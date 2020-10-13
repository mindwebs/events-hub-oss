/*----Packages----*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');

require('dotenv').config();

/*---- Global Variables ----*/
const port = process.env.port || 5000;
const startTime = new Date();

/*---- Express Router Configuration----*/
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(basicAuth({
    users: { 'foo': 'bar' }
}))

/*---- Mongo DB Configuration ----*/
/* 
    Remember to create a .env file with the following key value pair:
    ATLAS_URI=<your uri goes here>
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(()=>console.log('MongoDB connection established successfully'))
    .catch(err => console.log('Error:' + err));
const connection = mongoose.connection;

/*---- Grouped Handlers for various endpoints ----*/
const usersRouter = require('./routes/user');
const eventRouter = require('./routes/events');
const registerRouter = require('./routes/registration');
const ticketRouter = require('./routes/ticket');
const adminRouter = require('./routes/admin');

app.use('/user',usersRouter);
app.use('/events',eventRouter);
app.use('/register',registerRouter);
app.use('/ticket',ticketRouter);
app.use('/admin',adminRouter);

/*---- Default endpoint ----*/
app.route('/').get((req,res) => {
    res.json("Server started successfully on " + startTime);
})

/*---- Running the Express Server ----*/
app.listen(port, () => {
    console.log('Server is running on port:', port);
})