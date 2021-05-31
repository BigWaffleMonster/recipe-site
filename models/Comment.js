const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  commentText: {type: String, required: true},
  date: {type: Date, default: Date.now},
  owner: {type: Types.ObjectId, ref: 'User'},
  email: {type: String, required: true},
  recipe: {type: Types.ObjectId, ref: 'Recipe'},
})

module.exports = model('Comment', schema)