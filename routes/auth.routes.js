const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimum password length - 6 characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data'
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'User with such email already exists' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    return res.status(201).json({ message: 'User created' })


  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again' })
  }
})


router.post(
  '/login', 
  [
    check('email', 'Incorrect email').normalizeEmail().isEmail(),
    check('password', 'Incorrect password').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
  
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data'
      })
    }
  
    const {email, password} = req.body
  
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'User is not found' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({ message: 'Invalid data' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecrete'),
      { expiresIn: '1h'}
    )

    res.json({ token, userId: user.id })

  
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Try again' })
  }
})

module.exports = router