import { ShoppingModal } from "./ShoppingModal/ShoppingModal.js";
import state from "../../../../state/state.js"

class $Shopping {
    constructor() {
        this.element = document.createElement("div");
        this.element.className = "shopping";

        this.shoppingBtn = document.createElement("button");
        this.shoppingBtn.className = "shopping__btn";
        this.shoppingBtn.innerHTML = `
            <i class='fas fa-cart-arrow-down'></i>
        `;
        this.element.appendChild(this.shoppingBtn);
;
        this.element.appendChild(ShoppingModal.element);
        this.addEvent();
    }

    renderShoppingList() {
        ShoppingModal.setState({
            visible : true,
            shopping: state.get("shopping").data,
        });
    }

    toggleShoppingBtn() {
        const shoppingData = state.get("shopping").data;
        if(shoppingData[0]) {
            this.shoppingBtn.classList.add("active");
        }
        else {
            this.shoppingBtn.classList.remove("active");
        }
    }

    closeModal () {
        ShoppingModal.close();
    }

    addEvent(){
        this.element.addEventListener("click", (e) => {
            if(e.target.closest(".shopping__btn.active")){
                this.renderShoppingList();
            }
        })
    }

}

export const Shopping = new $Shopping();
 