const router = require('express').Router();
const isAuthorized = require('../../utils/authorization');
// const CanvasJS = require('canvasjs');
const {Weight, User} = require('../../models');

function findHighest(arr){
    let highest;

    for(let i = 0; i < arr.length; i++){
        if(!highest){
            highest = arr[i].weight;
        } 
        if (highest < arr[i].weight){
            highest = arr[i].weight;
        } 
    }

    return highest;
}

// function findHighestLowest(arr){
//     let highest;
//     let lowest;

//     for(let i = 0; i < arr.length; i++){
//         if(!highest){
//             highest = arr[i].weight;
//             lowest = arr[i].weight;
//         } else if (highest < arr[i].weight){
//             highest = arr[i].weight;
//         } else if (lowest > arr[i].weight){
//             lowest = arr[i].weight;
//         }
//     }

//     return [highest, lowest];
// }

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

        // let sortedWeights = findHighestLowest(allWeights)
        // // Will sort all the weights once
        // let highestWeight = sortedWeights[0];
        // // Will store the highest weight
        // let lowestWeight = sortedWeights[1];
        // // Will store the lowest weight

        const highestWeight = findHighest(allWeights);

        const dataPoints = [];

        allWeights.map((weight) => {
            let weightPoint = [weight.date_reported, weight.weight];

            dataPoints.push(weightPoint)
        })

        // const weightChart = CanvasJS.Chart("chartContainer", {
        //     animationEnabled: true,
        //     theme: "light2",
        //     title:{
        //         text: "Weight Journey"
        //     },
        //     axisY:{
        //         title: "Weight Reported in Lbs",
        //         includeZero: false
        //     },
        //     axisX: {
        //         title: "Date Reported"
        //     },
        //     data: [{        
        //         type: "line",
        //             indexLabelFontSize: 16,
        //         dataPoints: dataPoints
        //     }]
        // })
        // This will return all the weights array (with highest and lowest weights marked) as data to be rendered as a chart
        // This should be utilized via weightChart.render() at the front end
    
        res.render('dashboard', {
            ...allWeights,
            ...dataPoints,
            highestWeight: highestWeight,
            mostRecentlyReported: allWeights[0].date_reported,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        })
    } catch (err){
        res.status(500).json({message: 'Internal server error'});
    }
});


// This route will take the req body (which should only contain the user's weight), add the user's id stored in session, then create a new entry into the weight table
router.post('/newEntry', isAuthorized, async (req, res) => {
    try{
        req.body.user_id = req.session.user_id;

        const newWeightEntry = await Weight.create(req.body);
        
        res.status(200).json(newWeightEntry);
    }
    catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
})



router.put('/update', isAuthorized, async (req, res) => {
    try{
        const updatedWeightEntry = await User.update(req.body, {
            where: {
                id: req.session.user_id
            }
        });

        res.status(200).json(updatedWeightEntry);
    } catch(err) {
        res.status(500).json({message: 'Internal server error'})
    }
})


module.exports = router;