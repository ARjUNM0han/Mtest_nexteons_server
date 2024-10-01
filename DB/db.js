const mongoose = require('mongoose')

//connection string 

const constrg = process.env.DATABASE

const connect = mongoose.connect(constrg)

connect.then(() => {
    console.log('Database connection established')
}).catch((error) => {
    console.log(error)
})