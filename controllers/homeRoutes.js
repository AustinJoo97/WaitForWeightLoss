const router = require("express").Router();
const { User, Weight } = require("../models");
const isAuthorized = require("../utils/authorization");

function findHighest(arr) {
  let highest;

  for (let i = 0; i < arr.length; i++) {
    if (!highest) {
      highest = arr[i].weight;
    }
    if (highest < arr[i].weight) {
      highest = arr[i].weight;
    }
  }

  return highest;
}

// A welcome message with the user's username, their current weight(based on what was last reported), their last report date, and a form to enter new weight to store to db
router.get("/", isAuthorized, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
    });

    const weightData = await Weight.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["date_reported", "DESC"]],
    });

    // Should return a single element
    const user = userData.get({ plain: true });
    // Should return an array of weights
    const weights = [];
    weightData.forEach((weight) => {
      weights.push(weight.get({ plain: true }));
    });

    // weights[0] will be sent to the handlebar to utilize only the most recently entered weight by the user
    const weight = weights[0];

    const highest = findHighest(weights);

    res.render("homepage", {
      user: user,
      weight: weight,
      highest: highest,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//   This will either render the dashboard or login screens based on if the user is logged in or not
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
