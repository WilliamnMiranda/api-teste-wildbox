const Mongoose = require("mongoose")
const post = new Mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  image: String
})

module.exports = Mongoose.model('Post', post)