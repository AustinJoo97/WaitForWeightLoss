// Func to get all weight data
const getAllWeights = async () => {
    const allWeightData = await fetch('api/weight');

    if(allWeightData.ok){
        return;
    } else {
        alert(response.statusText)
    }
}

// Get chart for graphed weights over time
// const getWeightChart = async () => {
    
// }

// The below function will be used to add a new weight to the database
const newWeightEntry = async(event) => {
    event.preventDefault();

    const weight = document.querySelector('#weightEntry').value.trim();

    weight = Number(weight);

    // Check to ensure value is a number to be valid for saving

    const newWeightEntry = await fetch('api/weight/newEntry', {
        method: 'POST',
        body: JSON.stringify({ 
            weight: weight
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(newWeightEntry.ok){
        alert('Successfully added weight for today!')
        return;
    } else {
        alert(response.statusText)
    }
}

const newGoalWeight = async (event) => {

}