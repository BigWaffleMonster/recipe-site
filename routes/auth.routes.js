const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Minimun password lenght - 6').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data'
      })
    }
    
    const {email, password} = req.body
    
    const candidate = await User.findOne({ email })
    
    if (candidate) {
      return res.status(400).json({ message: 'Such user already exists!' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 121)
    
    const user = new User({ email, password: hashedPassword })
    
    await user.save()
    
    res.status(201).json({ message: 'User Created!' })
    
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong! Try again' })
  }
})

// api/auth/login
router.post(
  '/login',
  [
    check('email', 'Invalid email').normalizeEmail().isEmail(),
    check('password', 'Minimun password lenght - 6 ').exists().isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
 
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data'
      })
    }
    
    const {email, password} = req.body
    
    const user = User.findOne({ email })
    
    if (!user) {
      return res.status(400).json({ message: 'Such user doesn`t exist! ' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect data!' })
    }
    
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )
    
    res.json({ token, userId: user.id })
    
  } catch (e) {
  
  }
})

module.exports = router