import { SearchForm, Likes } from "../../views.js";

class $Header {
  constructor() {
    this.element = document.createElement("header");
    this.element.className = "header";
    this.element.insertAdjacentHTML(
      "afterbegin",
      `<img src="./src/images/logo.png" alt="Logo" class="header__logo" />`
    );
    
    this.element.appendChild(SearchForm.element);
    this.element.appendChild(Likes.element);
  }
  test() {
    console.log("Header test");
    console.log(this.element);
  }

  render(target) {
    // target.insertAdjacentHTML("afterbegin", this.markup);
    target.appendChild(this.element)
  }
}


export const Header = new $Header();