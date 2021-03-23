const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  mainText: {type: String, required: true},
  // image: {type: , required: true},
  date: {type: Date, default: Date.now},
  likes: {type: Number, default: 0},
  owner: {type: Types.ObjectId, ref: 'User'},
  comments: [{type: Types.ObjectId, ref: 'Comment'}] 
})

module.exports = model('Recipe', schema)