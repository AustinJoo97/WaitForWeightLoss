  const router = require('express').Router();
const userRoutes = require('./userRoutes');
const weightRoutes = require('./weightRoute');

router.use('/users', userRoutes);
router.use('/weight', weightRoutes);

module.exports = router;

