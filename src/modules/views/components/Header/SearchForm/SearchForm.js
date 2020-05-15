import { SearchInput } from "./SearchInput/SearchInput.js";
import {searchController} from "../../../../controllers/controller.js";

class $SearchForm {
  constructor() {
    this.element = document.createElement("form");
    this.element.className = "search";
    this.element.appendChild(SearchInput.element);
    this.element.insertAdjacentHTML(
      "beforeend",
      `
      <button class="btn search__btn">
        <svg class="search__icon">
          <use href="./src/images/icons.svg#icon-magnifying-glass"></use>
        </svg>
        <span>Search</span>
      </button>
    `
    );
    // this.markup = `
    //     <form class="search">
    //       <input type="text" class="search__field" placeholder="Try pizza, pasta, fries ... " />
    //       <button class="btn search__btn">
    //         <svg class="search__icon">
    //           <use href="./src/images/icons.svg#icon-magnifying-glass"></use>
    //         </svg>
    //         <span>Search</span>
    //       </button>
    //     </form>
    //     `;

    this.addEvent();
  }

  test() {
    console.log("SearchForm test");
  }
  addEvent() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = SearchInput.getInput();
      if(query){
        searchController(query);
        SearchInput.clearInput();
      }
      // console.log("dddd");
    });
  }
  // render(target) {
  //   target.insertAdjacentHTML("afterbegin", this.markup);
  // }
}

export const SearchForm = new $SearchForm();
