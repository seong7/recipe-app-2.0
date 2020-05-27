import { SearchForm, Likes, Shopping } from "../../views.js";

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
    // target.insertAdjacentHTML("afterbegin", this.markup);
    target.appendChild(this.element)
  }
}


export const Header = new $Header();