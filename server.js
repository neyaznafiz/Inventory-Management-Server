const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const colors = require('colors')
const app = require('./app')


// databse connection
mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log('Database connection is successful'.bold.italic.underline);
    })


// server
const port = process.env.PORT || 8080

app.listen(port, () => {
console.log(`App is running on port ${port}`.bgGreen.bold.italic);
})