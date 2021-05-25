const router = require('express').Router();
const { User, Weight } = require('../models');
const isAuthorized = require('../utils/authorization');

// The below code has been moved to weightRoute.js where the data for the user will be retrieved when going to the user's profile for indepth information about their weight loss

// router.get('/', async (req, res) => {
//     try {
//         if(req.session.logged_in){
//             const weightData = await Weight.findAll({
//                 where: {
//                     user_id: req.session.user_id
//                 },
//                 include: [
//                     {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 ]
//             });
        
//             const weights = weightData.map((weight) => weight.get({ plain: true }));
        
//             res.render('dashboard', { 
//                 weights, 
//                 logged_in: req.session.logged_in 
//             });
//         } else {
//             res.render('login');
//         }
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

// This will, as long as the user logged in (req.session.logged_in === true), show a welcome message page that will hold 4 main things
    // A welcome message with the user's username, their current weight(based on what was last reported), their last report date, and a form to enter new weight to store to db
router.get('/dashboard', isAuthorized, async (req, res) => {
    try {
        if(req.session.logged_in){
            // The below code needs to be changed so that the 4 major points listed above can be retrieved from the database
                // This will require the code to find the user's name via userData
                // It will also require retrieval of weight via req.session.user_id
                    // This latter part needs to only return the most recently entered data to retrieve current weight and date reported

            const userData = await User.findByPk(req.session.user_id, {
              attributes: { exclude: ['password'] }
            });
        
            const user = userData.get({ plain: true });
        
            // res.render('dashboard', {
            //   ...user,
            //   logged_in: true
            // });
        } else {
            res.render('login')
        }
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