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

      this.markup = `
      <div class="likes">
        <div class="likes__field likes__hover">
          <svg class="likes__icon">
            <use href="./src/images/icons.svg#icon-heart"></use>
          </svg>
        </div>
        <div class="likes__panel">
          <ul class="likes__list">

            <!-- 임시 -->
            
              <li>
                  <a class="likes__link" href="#23456">
                      <figure class="likes__fig">
                          <img src="./src/images/test-1.jpg" alt="Test">
                      </figure>
                      <div class="likes__data">
                          <h4 class="likes__name">Pasta with Tomato ...</h4>
                          <p class="likes__author">The Pioneer Woman</p>
                      </div>
                  </a>
              </li>
                      
          </ul>
        </div>
      </div>
      `;
    }

    render() {
        return this.markup;
    }
}

export const Likes = new $Likes();