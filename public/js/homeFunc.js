const newWeightEntry = async(event) => {
    event.preventDefault();

    const weight = document.querySelector('#currentWeightEntry').value;

    const newWeightEntry = await fetch('api/weight/newEntry', {
        method: 'POST',
        body: JSON.stringify({ 
            weight: weight
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(newWeightEntry.ok){
        alert('Successfully added weight for today!');
        document.location.reload();
    } else {
        alert(response.statusText)
    }
}

const updateGoalWeight = async (event) => {
    event.preventDefault();

    const newGoalWeight = document.querySelector('#goalWeightEntry').value;

    const newWeightEntry = await fetch('api/weight/update', {
        method: 'PUT',
        body: JSON.stringify({ 
            goal_weight: newGoalWeight
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    if(newWeightEntry.ok){
        alert('Successfully updated goal weight!');
        document.querySelector('#goalWeightEntry').value = '';
        document.getElementById('userGoalWeight').textContent = newGoalWeight;
    } else {
        alert(newWeightEntry.statusText);
    }
}

document.querySelector('#currentWeightForm').addEventListener('submit', newWeightEntry);
document.querySelector('#goalWeightForm').addEventListener('submit', updateGoalWeight);
