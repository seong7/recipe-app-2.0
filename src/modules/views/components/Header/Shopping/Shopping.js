import ShoppingModal from "./ShoppingModal/ShoppingModal.js";

class Shopping {
  /**
   * @param {Alerts} alerts
   */
  constructor(alerts) {
    this.shoppingData;

    this.modal = new ShoppingModal(alerts);
    this.element = document.createElement("div");
    this.element.className = "shopping";

    this.shoppingBtn = document.createElement("button");
    this.shoppingBtn.className = "shopping__btn";
    this.shoppingBtn.innerHTML = `
            <i class='fas fa-cart-arrow-down'></i>
        `;
    this.element.appendChild(this.shoppingBtn);
    this.element.appendChild(this.modal.element);
    this.addEvent();
  }

  renderShoppingList() {
    this.modal.setState({
      visible: true,
      shopping: this.shoppingData,
    });
  }

  /**
   * @param {array} shoppingData
   */
  setState(shoppingData) {
    this.shoppingData = shoppingData;
    this.toggleShoppingBtn();
  }

  toggleShoppingBtn() {
    if (this.shoppingData[0]) {
      this.shoppingBtn.classList.add("active");
    } else {
      this.shoppingBtn.classList.remove("active");
    }
  }

  closeModal() {
    this.modal.close();
  }

  addEvent() {
    this.element.addEventListener("click", (e) => {
      if (e.target.closest(".shopping__btn.active")) {
        this.renderShoppingList();
      }
    });
  }
}

export default Shopping;
