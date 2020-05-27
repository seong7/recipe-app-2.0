import { ShoppingModal } from "./ShoppingModal/ShoppingModal.js";
import state from "../../../../state/state.js"

class $Shopping {
    constructor() {
        this.element = document.createElement("div");
        this.element.className = "shopping";
        this.element.insertAdjacentHTML("afterbegin", `
            <button class="shopping__btn">
                <i class='fas fa-cart-arrow-down'></i>
            </button>
        `)

        this.element.appendChild(ShoppingModal.element);
        this.addEvent();
    }

    addEvent(){
        this.element.addEventListener("click", (e) => {
            if(e.target.closest(".shopping__btn")){
                ShoppingModal.setState({
                    visible : true,
                    shopping: state.get("shopping").data,
                });
            }
        })
    }

}

export const Shopping = new $Shopping();
 