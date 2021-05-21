const {Router} = require('express')
const Recipe = require('../models/Recipe')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './client/src/components/recipeImages/');
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

router.post('/create', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, mainText } = req.body
    const image = req.file.filename

    const recipe = new Recipe({
      title, mainText, image, owner: req.user.userId
    })

    await recipe.save()

    res.status(201).json({ recipe })

  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again!, ${error}` })
  }
})

router.post('/detail/like/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    recipe.likes++
    await recipe.save()
    res.json({ message: 'Cool'})
  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again ${error}` })
  }
})


router.get('/:recipeName', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ title:{$regex: req.params.recipeName } })
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again ${error}` })
  }
})

router.get('/detail/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again' })
  }
})


router.get('/getUserRecipes/:id', auth, async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ owner: req.params.id })
    res.json(userRecipes)
  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again ${error}` })
  }
})

router.delete('/delete_userRecipe/:id', auth, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete({ _id: req.params.id })
    await Comment.deleteMany({ recipe: req.params.id })
    res.json(200)
  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again ${error}` })
  }
})

router.post('/userRecipe/update/:id', auth, async (req, res) => {
  try {
    const {title, mainText} = req.body

    const recipe = await Recipe.findByIdAndUpdate({ _id: req.params.id }, {
      title, mainText
    })

    await recipe.save()

    res.status(201).json({ recipe })
  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again ${error}` })
  }
})



module.exports = router