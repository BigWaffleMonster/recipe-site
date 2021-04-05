const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
 
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/recipe', require('./routes/recipe.routes'))
app.use('/recipeImages', express.static('recipeImages'))

const PORT = config.get('port')

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()