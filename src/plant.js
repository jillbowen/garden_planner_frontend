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
            <div data-id=${this.id}>
                <h3>${this.name}</h3>
                <p>${this.description}</p>
                <img src=${this.image_url} height="250" width="300">
                <p>Find this in the ${this.garden.name} garden.</p>
                <button data-id=${this.id} id="edit" name="edit">Edit</button>  <button data-id=${this.id} id="remove" name="remove">Remove</button>
            <div>
            <br>`;
    }
}
Plant.all = [];