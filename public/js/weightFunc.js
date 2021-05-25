const getAllWeights = async () => {
    const allWeightData = await fetch('api/weight');

    if(allWeightData.ok){
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