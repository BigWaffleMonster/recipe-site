const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  UserRecipes: [{type: Types.ObjectId, ref: 'Recipe'}]
})

module.exports = model('User', schema)