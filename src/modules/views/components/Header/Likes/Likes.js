import {LikesPanel} from "./LikesPanel/LikesPanel.js";

class $Likes {
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "likes";
      this.element.insertAdjacentHTML("afterbegin", `
        <div class="likes__field likes__hover">
          <svg class="likes__icon">
            <use href="./src/images/icons.svg#icon-heart"></use>
          </svg>
        </div>
      `)
      this.element.appendChild(LikesPanel.element);

    }

    renderLikes(likesArray) {
      LikesPanel.renderLikes(likesArray);
    }

}

export const Likes = new $Likes();