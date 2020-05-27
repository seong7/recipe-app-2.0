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

    toggleLikesIcon(likesArray) {
      if(likesArray[0]) {
        // console.log(document.querySelector(".likes__icon"));
        document.querySelector(".likes__icon").classList.add("active");
      }
      else{
        document.querySelector(".likes__icon").classList.remove("active");
      }
    }

    renderLikes(likesArray) {
      this.toggleLikesIcon(likesArray);
      LikesPanel.renderLikes(likesArray);
    }

}

export const Likes = new $Likes();