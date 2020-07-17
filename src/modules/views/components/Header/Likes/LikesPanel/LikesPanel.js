import { Image } from "../../../..";

class LikesPanel {
  constructor() {
    this.like = new Like();

    this.element = document.createElement("div");
    this.element.className = "likes__panel";
    this.ul = document.createElement("ul");
    this.ul.className = "likes__list";
    this.element.appendChild(this.ul);

    // 임시
    //       <li>
    //           <a class="likes__link" href="#47746">
    //               <figure class="likes__fig">
    //                   <img src="./src/images/test-1.jpg" alt="Test">
    //               </figure>
    //               <div class="likes__data">
    //                   <h4 class="likes__name">Pasta with Tomato ...</h4>
    //                   <p class="likes__author">The Pioneer Woman</p>
    //               </div>
    //           </a>
    //       </li>
  }

  /**
   *
   * @param {Array} likesArray
   */
  renderLikes(likesArray) {
    this.ul.innerHTML = "";

    likesArray.forEach((like) => {
      this.like.renderLike(this.ul, like);
    });
    this.blinkLikesPanel(likesArray.length);
  }

  /**
   *
   * @param {number} numOfLikes
   */
  blinkLikesPanel(numOfLikes) {
    if (numOfLikes > 0) {
      this.element.style.opacity = 1;
      this.element.style.visibility = "visible";
    }
    setTimeout(() => {
      this.element.style.opacity = "";
      this.element.style.visibility = "";
    }, 1000);
  }
}

class Like {
  constructor() {
    this.likes = [];
  }

  /**
   * @param {HTMLElement} target
   * @param {Object} like
   */
  renderLike(target, like) {
    target.appendChild(this.createLike(like));
  }

  /**
   * @param {Object} like
   */
  createLike(like) {
    const a = document.createElement("a");
    a.href = `#${like.recipe_id}`;
    a.className = "likes__link";

    const figure = document.createElement("figure");
    figure.className = "likes__fig";

    const img = new Image(like.image_url, like.title);
    img.render(figure);

    a.insertAdjacentElement("afterbegin", figure);
    a.insertAdjacentHTML(
      "beforeend",
      `
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.publisher}</p>
            </div>
        `
    );

    const li = document.createElement("li");
    li.insertAdjacentElement("afterbegin", a);

    return li;
  }
}

export default LikesPanel;
