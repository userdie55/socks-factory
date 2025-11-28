const router = require('express').Router()
const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const cartRouter = require('./cart.routes')
const favoriteRouter = require('./favorite.routes')

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/cart', cartRouter)
router.use('/favorites', favoriteRouter)

module.exports = router