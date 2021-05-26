// All of these functions are meant to be run when the in-depth profile is serving as the user's DOM

// Get basic homepage look at profile; this should be used when the user is swapping to the basic overview
const getBasicView = async () => {
    const basicWeightData = await fetch('/');

    if(basicWeightData.ok){
        return;
    } else {
        alert(response.statusText)
    }
}

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

// This function will be user to update the user's goal weight as defined previously in the database
const updateGoalWeight = async (event) => {
    event.preventDefault();

    const newGoalWeight = document.querySelector('#updateWeight').value.trim();

    newGoalWeight = Number(newGoalWeight);

    const newWeightEntry = await fetch('api/weight/update', {
        method: 'PUT',
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