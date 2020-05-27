import { SearchForm, Likes, Shopping } from "../../views.js";
import state from "../../../state/state.js";

class $Header {
  constructor() {
    this.element = document.createElement("header");
    this.element.className = "header";
    this.element.insertAdjacentHTML(
      "afterbegin",
      `
        <img src="./src/images/logo.png" alt="Logo" class="header__logo" />
      `
    );

    this.element.appendChild(SearchForm.element);
    this.element.appendChild(this.createHeaderBtns());
    this.addEvent();
  }
  test() {
    console.log("Header test");
    console.log(this.element);
  }

  createHeaderBtns () {
    const header__btns = document.createElement("div");
    header__btns.className = "header__btns";
    header__btns.appendChild(Shopping.element);
    header__btns.appendChild(Likes.element);
    return header__btns;
  }

  render(target) {
    this.toggleShoppingBtn();
    
    // target.insertAdjacentHTML("afterbegin", this.markup);
    target.appendChild(this.element)
  }

  toggleBtns (btn_name) {
   if(btn_name === "likes"){
      // Likes.toggleLikesBtn();
    }
  }

  toggleShoppingBtn() {
    Shopping.toggleShoppingBtn();
  }

  addEvent() {
    this.element.addEventListener("click" , (e) => {
      if(e.target.classList.contains("shopping__clear")){
        // console.log("clear");
        state.get("shopping").clear();

        Shopping.closeModal();
        this.toggleShoppingBtn();
    }

    // shopping delete 버튼
      // closest shopping__item 찾음 -> dataset id 값 구함
      // shopping model 의 배열에서 id 값 동일한 것 삭제
      // persist
         // 만약 이제 없으면 모달 닫음 , 버튼 토글
         // 아직 있으면
           // shopping__list re-render
      if(e.target.matches(".shopping__delete *")){
        // console.log(e.target.closest(".shopping__item").dataset.id);
        const id = e.target.closest(".shopping__item").dataset.id;
        // console.log(id);

        state.get("shopping").deleteItem(Number(id));
        if(state.get("shopping").isEmpty()){
          Shopping.closeModal();
          this.toggleShoppingBtn();
        }
        else {
          Shopping.renderShoppingList();
        }
      }
    })
  }
}


export const Header = new $Header();