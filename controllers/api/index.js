const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./weightRoute');

router.use('/users', userRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
