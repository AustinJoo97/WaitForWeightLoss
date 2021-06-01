const router = require("express").Router();
const isAuthorized = require("../../utils/authorization");
const { Weight, User } = require("../../models");

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

router.get("/", isAuthorized, async (req, res) => {
  try {
    const allWeightsData = await Weight.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    const allWeights = allWeightsData.map((weight) =>
      weight.get({ plain: true })
    );
    // Should return an array with all Weight.ValueType data

    const highestWeight = findHighest(allWeights);

    res.render("dashboard", {
      allWeights,
      highestWeight,
      mostRecentlyReported: allWeights[0].date_reported,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// This route will take the req body (which should only contain the user's weight), add the user's id stored in session, then create a new entry into the weight table
router.post("/newEntry", isAuthorized, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;

    const newWeightEntry = await Weight.create(req.body);
    res.status(200).json(newWeightEntry);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update", isAuthorized, async (req, res) => {
  try {
    const updatedWeightEntry = await User.update(req.body, {
      where: {
        id: req.session.user_id,
      },
    });
    res.status(200).json(updatedWeightEntry);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/dataPoints", async (req, res) => {
  try {
    const allWeightsData = await Weight.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["date_reported", "ASC"]],
    });

    const allWeights = allWeightsData.map((weight) =>
      weight.get({ plain: true })
    );
    // Should return an array with all Weight.ValueType data

    const dataPoints = [];

    allWeights.map((weight) => {
      let weightPoint = [weight.date_reported, weight.weight];

      dataPoints.push(weightPoint);
    });

    res.status(200).send(dataPoints);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
