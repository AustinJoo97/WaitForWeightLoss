const router = require('express').Router();
const { User, Weight } = require('../models');
const isAuthorized = require('../utils/authorization');

router.get('/', async (req, res) => {
    try {
        if(req.session.logged_in){
            const weightData = await Weight.findAll({
                where: {
                    user_id: req.session.user_id
                },
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ]
            });
        
            const weights = weightData.map((weight) => weight.get({ plain: true }));
        
            res.render('dashboard', { 
                weights, 
                logged_in: req.session.logged_in 
            });
        } else {
            res.render('login');
        }
    } catch (err) {
      res.status(500).json(err);
    }
});

// This will, as long as the user logged in (req.session.logged_in === true), take the user to their dashboard by loading the dashboard handlebar
router.get('/dashboard', isAuthorized, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Weight }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   This will either render the dashboard or login screens based on if the user is logged in or not
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
});
  
  module.exports = router;