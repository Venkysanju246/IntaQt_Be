const mongoose = require("mongoose")

require("dotenv").config()
const connectionToDb = mongoose.connect(process.env.MONGO_URI)

module.exports = connectionToDb