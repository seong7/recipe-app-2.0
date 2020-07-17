import List from "./List/List.js";

class IngredientsList {
  constructor() {
    this.list = new List();

    this.element = document.createElement("ul");
    this.element.className = "recipe__ingredient-list";
  }

  /**
   *
   * @param {Array} ingredients
   */
  renderList(ingredients) {
    // console.log(ingredients);
    this.clear();
    const list = ingredients
      .map((el) => this.list.createIngredient(el))
      .join("");
    this.element.insertAdjacentHTML("afterbegin", list);
  }

  /**
   *
   * @param {HTMLElement} target
   * @param {Array} ingredients
   */
  render(target, ingredients) {
    this.renderList(ingredients);
    target.insertAdjacentElement("afterbegin", this.element);
  }

  clear() {
    this.element.innerHTML = "";
  }
}

export default IngredientsList;
