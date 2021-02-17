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
        renderPlants(plants)
    })
};

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
};

function createPlantFormHandler(e) {
    e.preventDefault()
    const nameInput = document.querySelector("#plant-name").value 
    const descriptionInput = document.querySelector("#plant-description").value
    const imgInput = document.querySelector("#plant-img-url").value
    const gardenId = parseInt(document.querySelector("#gardens").value)
    postFetch(nameInput, descriptionInput, imgInput, gardenId)
};

function postFetch(name, description, img_url, garden_id) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( {
            name: name,
            description: description,
            img_url: img_url,
            garden_id: garden_id
        })
    })
    .then(response => response.json())
    .then(plant => {
        console.log(plant);
    })
}