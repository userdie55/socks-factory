const router = require('express').Router()
const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const cartRouter = require('./cart.routes')
const favoritesRouter = require('./favorites.routes');
const designsRouter = require('./design.routes');

router.use('/designs', designsRouter);

router.use('/favorites', favoritesRouter);

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/cart', cartRouter)

module.exports = router