// JS Mantra * When some event happens, 
// I want to make what kind of fetch, 
// and then manipulate the DOM in what way?*

const endPoint = "http://localhost:3000/api/v1/plants"

document.addEventListener('DOMContentLoaded', () => {
    getPlants()

    const createPlantForm = document.querySelector("#create-plant-form")

    createPlantForm.addEventListener("submit", (e) => createPlantFormHandler(e))
});

function getPlants() {
    fetch(endPoint)
    .then(response => response.json())
    .then(plants => {
        plants.data.forEach(plant => {
            let newPlant = new Plant(plant, plant.attributes)
            document.querySelector('#plant-container').innerHTML += newPlant.renderPlantCard()
        })
    })
};

function createPlantFormHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector("#plant-name").value 
    const descriptionInput = document.querySelector("#plant-description").value
    const imgInput = document.querySelector("#plant-img-url").value
    const gardenId = parseInt(document.querySelector("#gardens").value)
    postFetch(nameInput, descriptionInput, imgInput, gardenId)
};

function postFetch(name, description, image_url, garden_id) {
    const bodyData = {name, description, image_url, garden_id}
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(plant => {
        const plantData = plant.data
        let newPlant = new Plant(plantData, plantData.attributes)
        document.querySelector('#plant-container').innerHTML += newPlant.renderPlantCard()
    })
}