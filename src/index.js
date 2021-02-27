// JS Mantra * When some event happens, 
// I want to make what kind of fetch, 
// and then manipulate the DOM in what way?*

const endPoint = "http://localhost:3000/api/v1/plants"

document.addEventListener('DOMContentLoaded', () => {
    getPlants()
    const createPlantForm = document.querySelector("#create-plant-form")
    createPlantForm.addEventListener("submit", (e) => createPlantFormHandler(e))

    document.addEventListener("click", (e) => {
        const plantId = e.target.dataset.id 
        if(e.target.innerText === "Remove"){
            fetch(`${endPoint}/${plantId}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(plant => e.target.parentElement.remove())
        }
    })
});

function getPlants() {
    fetch(endPoint)
    .then(response => response.json())
    .then(plants => {
        plants.data.forEach(plant => {
            let newPlant = new Plant(plant, plant.attributes)
            const gardenId = plant.attributes.garden.id
            if (gardenId === 1)
                document.querySelector("#veggie-container").innerHTML += newPlant.renderPlantCard()
            if (gardenId === 2)
                document.querySelector("#flower-container").innerHTML += newPlant.renderPlantCard()
            if (gardenId === 3)
                document.querySelector("#herb-container").innerHTML += newPlant.renderPlantCard()
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
        const gardenId = document.querySelector("#gardens").value
        // const numberOfVeggies = document.querySelector("#veggie-container").getElementsByTagName("div").length
        // const numberOfFlowers = document.querySelector("#flower-container").getElementsByTagName("div").length
        // const numberOfHerbs = document.querySelector("#herb-container").getElementsByTagName("div").length
        let newPlant = new Plant(plantData, plantData.attributes)
            if (gardenId === "1")
                document.querySelector("#veggie-container").innerHTML += newPlant.renderPlantCard()
            if (gardenId === "2")
                document.querySelector("#flower-container").innerHTML += newPlant.renderPlantCard()
            if (gardenId === "3")
                document.querySelector("#herb-container").innerHTML += newPlant.renderPlantCard()
    })
}