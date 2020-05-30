import {likeController} from "../../../../controllers/controller.js";

class $LikesBtn {
    constructor() {
        const $button = document.createElement("button");
        $button.className = "recipe__love";
        this.element = $button;
        this.isLiked;

        // this.render(isLiked);
        this.addEvent();
    }

    render ($target, isLiked) {
        this.setLiked(isLiked);
        $target.appendChild(this.element);
    }

    toggleLiked () {
        this.isLiked ? this.setLiked(false) : this.setLiked(true);
    }
    
    setLiked (isLiked) {
        this.isLiked = isLiked;
        this.clear();
        this.element.insertAdjacentHTML("afterbegin", `
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="images/icons.svg#icon-heart${
                        this.isLiked ? "" : "-outlined"
                    }"></use>
                </svg>
            </button>
        `);
    }

    clear() {
        this.element.innerHTML = "";
    }

    addEvent() {
        this.element.addEventListener("click", () => {
            likeController();
            this.toggleLiked()
        })
    }
}

export const LikesBtn = new $LikesBtn();