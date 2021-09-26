// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
//Port declared
const PORT = process.env.PORT || 8080; 
//Routes
const routes = require('./routes/api');

//my mongodb
const myDB='mongodb+srv://Glen:1@mydb.shspx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//Connect to database
mongoose.connect(process.env.MONGODB_URI || myDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Return that we are connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

//Listen to port
app.listen(PORT, console.log(`Server is starting at ${PORT}`));