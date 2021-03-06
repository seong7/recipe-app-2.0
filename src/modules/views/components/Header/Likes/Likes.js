import LikesPanel from "./LikesPanel/LikesPanel.js";

class Likes {
  constructor() {
    this.likesPanel = new LikesPanel();

    this.element = document.createElement("div");
    this.element.className = "likes";
    this.element.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="likes__field likes__hover">
          <svg class="likes__icon">
            <use href="images/icons.svg#icon-heart"></use>
          </svg>
        </div>
      `
    );
    this.element.appendChild(this.likesPanel.element);
  }

  /**
   * @param {Array} likesArray
   */
  toggleLikesBtn(likesArray) {
    if (likesArray[0]) {
      // console.log(document.querySelector(".likes__icon"));
      document.querySelector(".likes__icon").classList.add("active");
      document.querySelector(".likes__field").classList.add("active");
    } else {
      document.querySelector(".likes__field").classList.remove("active");
      document.querySelector(".likes__icon").classList.remove("active");
    }
  }

  /**
   * @param {Array} likesArray
   */
  renderLikes(likesArray) {
    this.toggleLikesBtn(likesArray);
    this.likesPanel.renderLikes(likesArray);
  }
}

export default Likes;
