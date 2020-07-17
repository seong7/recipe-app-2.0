import { SearchForm, Likes, Shopping } from "../..";
import { LikesModel, ShoppingModel } from "../../../models/models";

class Header {
  /**
   * @param {ShoppingModel} shoppingModel
   * @param {LikesModel} likesModel
   * @param {Alerts} alerts
   */
  constructor(shoppingModel, likesModel, alerts) {
    this.likes = new Likes();
    this.likesModel = likesModel;
    this.shopping = new Shopping(alerts);
    this.shoppingModel = shoppingModel;
    this.alerts = alerts;

    this.element = document.createElement("header");
    this.element.className = "header";
    this.element.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="header__logo-wrapper">
        <img src="images/logo.png" alt="Logo" class="header__logo" />
        <span>v 2.0</span>
      </div>
      `
    );

    this.element.appendChild(SearchForm.element);
    this.element.appendChild(this.createHeaderBtns());
    this.addEvent();
  }

  createHeaderBtns() {
    const header__btns = document.createElement("div");
    header__btns.className = "header__btns";
    header__btns.appendChild(this.shopping.element);
    header__btns.appendChild(this.likes.element);
    return header__btns;
  }

  /**
   *
   * @param {HTMLElement} target
   */
  render(target) {
    // target.insertAdjacentHTML("afterbegin", this.markup);
    target.appendChild(this.element);

    this.toggleShoppingBtn();
    this.likes.renderLikes(this.likesModel.getLikes());
  }

  toggleShoppingBtn() {
    this.shopping.setState(this.shoppingModel.data);
  }

  addEvent() {
    this.element.addEventListener("click", (e) => {
      if (e.target.classList.contains("shopping__clear")) {
        // console.log("clear");

        this.shoppingModel.clear();

        this.shopping.closeModal();
        this.toggleShoppingBtn();

        this.alerts.renderAlert("쇼핑리스트가 비워졌습니다.", "green");
      }

      // shopping delete 버튼
      // closest shopping__item 찾음 -> dataset id 값 구함
      // shopping model 의 배열에서 id 값 동일한 것 삭제
      // persist
      // 만약 이제 없으면 모달 닫음 , 버튼 토글
      // 아직 있으면
      // shopping__list re-render
      if (e.target.matches(".shopping__delete *")) {
        // console.log(e.target.closest(".shopping__item").dataset.id);
        const id = e.target.closest(".shopping__item").dataset.id;
        // console.log(id);

        this.shoppingModel.deleteItem(Number(id));
        if (this.shoppingModel.isEmpty()) {
          this.shopping.closeModal();
          this.toggleShoppingBtn();
        } else {
          this.shopping.renderShoppingList();
        }
      }
    });
  }
}

export default Header;
