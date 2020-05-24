import {List} from './List/List.js'

class $IngredientsList {
    constructor() {
        this.element = document.createElement("ul");
        this.element.className = "recipe__ingredient-list";
    }

    renderList(ingredients) {
        this.clear();
        const list = ingredients.map((el) => List.createIngredient(el)).join("");
        this.element.insertAdjacentHTML("afterbegin", list);
    }

    render ($target, ingredients) {
        this.renderList(ingredients);
        $target.insertAdjacentElement("afterbegin", this.element);
    }

    clear () {
        this.element.innerHTML = "";
    }


}

export const IngredientsList = new $IngredientsList();