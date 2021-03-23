const {Router} = require('express')
const Recipe = require('../models/Recipe')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
  try {
    const { title, mainText } = req.body

    const recipe = new Recipe({
      title, mainText, owner: req.user.userId
    })

    await recipe.save()

    res.status(201).json({ recipe })

  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again!` })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.user.userId })
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again' })
  }
})


module.exports = router