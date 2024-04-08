const mongoose = require('mongoose')

const Schema = mongoose.Schema

const partSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ammount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Part', partSchema)