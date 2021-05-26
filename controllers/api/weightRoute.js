const router = require('express').Router();
const isAuthorized = require('../../utils/authorization');
// const CanvasJS = require('canvasjs');
const {Weight, User} = require('../../models');

function findHighestLowest(arr){
    let highest;
    let lowest;

    for(let i = 0; i < arr.length; i++){
        if(!highest){
            highest = arr[i].weight;
            lowest = arr[i].weight;
        } else if (highest < arr[i].weight){
            highest = arr[i].weight;
        } else if (lowest > arr[i].weight){
            lowest = arr[i].weight;
        }
    }

    return [highest, lowest];
}

router.get('/', isAuthorized, async (req, res) => {
    try{
        const allWeightsData = await Weight.findAll({
            where: {
                user_id: req.session.user_id
            },
            order: [['date_reported', 'DESC']]
        })
    
        const allWeights = allWeightsData.map((weight) => weight.get({plain:true}));
        // Should return an array with all Weight.ValueType data

        let sortedWeights = findHighestLowest(allWeights)
        // Will sort all the weights once
        let highestWeight = sortedWeights[0];
        // Will store the highest weight
        let lowestWeight = sortedWeights[1];
        // Will store the lowest weight

        const dataPoints = [];

        allWeights.map((weight) => {
            let weightObj;
            if(weight.weight === highestWeight){
                weightObj = {label: weight.date_reported, y: weight.weight, indexLabel: "\u2191 highest", markerColor: "red", markerType: "triangle"}
            } else if(weight.weight === lowestWeight){
                weightObj = {label: weight.date_reported, y: weight.weight, indexLabel: "\u2193 lowest", markerColor: "blue", markerType: "triangle"};
            } else {
                weightObj = {label: weight.date_reported, y: weight.weight}
            }
            dataPoints.push(weightObj)
        })

        const weightChart = CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Weight Journey"
            },
            axisY:{
                title: "Weight Reported in Lbs",
                includeZero: false
            },
            axisX: {
                title: "Date Reported"
            },
            data: [{        
                type: "line",
                    indexLabelFontSize: 16,
                dataPoints: dataPoints
            }]
        })
        // This will return all the weights array (with highest and lowest weights marked) as data to be rendered as a chart
        // This should be utilized via weightChart.render() at the front end
    
        res.render('dashboard', {
            ...allWeights,
            weightChart,
            sortedWeights,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        })
    } catch (err){
        res.status(500).json({message: 'Internal server error'})
    }
});


// This route will take the req body (which should only contain the user's weight), add the user's id stored in session, then create a new entry into the weight table
router.post('/newEntry', isAuthorized, async (req, res) => {
    try{
        req.body.user_id = req.session.user_id;

        const newWeightEntry = await Weight.create(req.body);

        req.session.save(() => {
            req.session.user_id = newWeightEntry.user_id;
            req.session.logged_in = true;

            res.status(200).json(newWeightEntry);
        })
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
})



router.put('/update', isAuthorized, async (req, res) => {
    try{
        const updatedWeightEntry = await User.find({
            where: {
                id: req.session.user_id
            }
        }).on('success', (user) => {
            user.update({
                goal_weight: req.body.weight
            })
        })

        req.session.save(() => {
            req.session.user_id = updatedWeightEntry.user_id;
            req.session.logged_in = true;

            res.status(200).json(updatedWeightEntry);
        })
    } catch(err) {
        res.status(500).json({message: 'Internal server error'})
    }
})


module.exports = router;