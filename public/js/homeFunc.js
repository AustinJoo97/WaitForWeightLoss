// All of these functions are meant to be run when the basic homepage is serving as the user's current DOM

const getBasicView = async () => {
    const basicWeightData = await fetch('/');

    if(basicWeightData.ok){
        return;
    } else {
        alert(response.statusText)
    }
}

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

    const weight = document.querySelector('#currentWeight').value;

    const newWeightEntry = await fetch('api/weight/newEntry', {
        method: 'POST',
        body: JSON.stringify({ 
            weight: weight
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(newWeightEntry.ok){
        alert('Successfully added weight for today!')
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

const updateGoalWeight = async (event) => {
    event.preventDefault();

    const newGoalWeight = document.querySelector('#goalWeight').value.trim();

    const newWeightEntry = await fetch('api/weight/update', {
        method: 'PUT',
        body: JSON.stringify({ 
            weight: newGoalWeight
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(newWeightEntry.ok){
        alert('Successfully updated goal weight!');
        document.querySelector('#currentGoalWeight').textContent = newGoalWeight;
    } else {
        alert(response.statusText);
    }
}

// document.getElementById('in_depth_button').addEventListener('onclick', getInDepthView);

document.getElementById('currentWeightForm').addEventListener('submit', newWeightEntry);
document.getElementById('goalWeightForm').addEventListener('submit', updateGoalWeight);
