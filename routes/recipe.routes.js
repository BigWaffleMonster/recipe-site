const {Router} = require('express')
const Recipe = require('../models/Recipe')
const auth = require('../middleware/auth.middleware')
const router = Router()

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './recipeImages/');
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


module.exports = router