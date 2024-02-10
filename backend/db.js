const mongoose = require('mongoose')

const URI = "mongodb://localhost:27017"


const connectToMongo = async () => {
  try {
    await mongoose.connect(URI)
    console.log("Connected")
  } catch (error) {
    console.log("Problem: ")
    console.log(error)
    console.log("not connected")
  }
};


module.exports = connectToMongo;