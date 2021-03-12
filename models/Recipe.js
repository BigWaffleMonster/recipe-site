const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  image: {type: , required: true},
  likes: {type: Number, default: 0},
  comments: [{type: Types.ObjectId, ref: 'Comment'}]
})

module.exports = model('User', schema)