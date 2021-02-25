class Plant {

    constructor(plant, plantAttributes) {
        this.id = plant.id
        this.name = plantAttributes.name
        this.description = plantAttributes.description
        this.image_url = plantAttributes.image_url
        this.garden = plantAttributes.garden
        Plant.all.push(this)
    }

    renderPlantCard() {
        return`
            <div id="plant-card" data-id=${this.id}>
                <h4>${this.name}</h4>
                <p>${this.description}</p>
                <img src=${this.image_url}><br>
                <button data-id=${this.id} id="remove" name="remove">Remove</button>
            </div>
            <br>`;
    }
}
Plant.all = [];