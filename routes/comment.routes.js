const {Router} = require('express')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const router = Router()


router.post('/setComment/:id', auth, async (req, res) => {
  try {
    const {commentText} = req.body

    const usr = await User.findById(req.user.userId)
    const email = usr.email

    const comment = new Comment({
      commentText, owner: req.user.userId, recipe: req.params.id, email
    })

    await comment.save()
    res.json({ comment })
  } catch (error) {
    res.status(500).json({ message: `Something went wrong. Try again ${error}` })
  }
})

router.get('/commentList/:id', auth, async (req, res) => {
  try {
    const commentList = await Comment.find({ recipe: req.params.id })
    res.json(commentList)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again' })
  }
})


module.exports = router