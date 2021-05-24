const getAllWeights = async () => {
    const allWeightData = await fetch('api/weight');

    if(allWeightData.ok){
        return;
    } else {
        alert(response.statusText)
    }
}