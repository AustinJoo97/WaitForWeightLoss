// All of these functions are meant to be run when the basic homepage is serving as the user's current DOM

// Get chart and all weight info for graphed weights over time and in-depth profile; this should be triggered when the user is switching to in-depth mode
const getInDepthView = async () => {
    const allWeightData = await fetch('api/weight/');

    if(allWeightData.ok){
        return;
    } else {
        alert(response.statusText)
    }
}

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

const updateGoalWeight = async (event) => {
    event.preventDefault();

    const newGoalWeight = document.querySelector('#updateWeight').value.trim();

    newGoalWeight = Number(newGoalWeight);

    const newWeightEntry = await fetch('api/weight/update', {
        method: 'POST',
        body: JSON.stringify({ 
            weight: newGoalWeight
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(newWeightEntry.ok){
        alert('Successfully updated goal weight!');
        return;
    } else {
        alert(response.statusText);
    }
}