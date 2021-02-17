const endPoint = "http://localhost:3000/api/v1/plants"

document.addEventListener('DOMContentLoaded', () => {
    getPlants()
})

function getPlants() {
    fetch(endPoint)
    .then(response => response.json())
    .then(plants => {
        renderPlants(plants)
    })
}

function renderPlants(plants) {
    plants.data.forEach(plant => {
        const plantInfo = `
            <div data-id=${plant.id}>
                <h3>${plant.attributes.name}</h3>
                <p>${plant.attributes.description}</p>
                <img src=${plant.attributes.image_url} height="250" width="300">
                <p>Find this in the ${plant.attributes.garden.name} garden.</p>
                <button data-id=${plant.id}>Edit</button>
            <div>
            <br>`;

            document.querySelector('#plant-container').innerHTML += plantInfo
    });
}