import { Image } from "../../..";

class $ResultList {
  constructor() {
    const ul = document.createElement("ul");
    ul.className = "results__list";
    this.element = ul;
  }

  render(results, page, resPerpage) {
    // 페이지 별 render 할 results 배열 내 index 지정
    const start = (page - 1) * resPerpage;
    const end = page * resPerpage;

    this.clearList();
    results.slice(start, end).forEach((c) => this.addLi(c));
    return this.element;
  }

  addLi(result) {
    // figure 생성
    const figure = document.createElement("figure");
    figure.className = "results__fig";

    // img 생성
    const img = new Image(result.image_url, result.title);
    img.render(figure);

    // a 생성
    const a = document.createElement("a");
    a.className = "results__link";
    a.href = `#${result.recipe_id}`; // a 태그에 href = "#..." 하면 page reload 안함

    a.appendChild(figure);
    a.insertAdjacentHTML(
      "beforeend",
      `
        <div class="results__data">
            <h4 class="results__name">${
              /*limitRecipeTitle(result.title)*/ result.title
            }</h4>
            <p class="results__author">${result.publisher}</p>
        </div>
      `
    );

    // li 생성
    const li = document.createElement("li");
    li.appendChild(a);

    this.element.insertAdjacentElement("beforeend", li);
  }

  // 선택된 li 강조
  hightlightSelected(id) {
    // 기존 선택 음식 active 삭제
    const prevSelected = document.querySelector(".results__link--active");
    if (prevSelected) {
      prevSelected.classList.remove("results__link--active");
    }

    // 현재 선택 음식 active 추가
    const selected = document.querySelector(`.results__link[href*="#${id}"`);
    if (selected) {
      selected.classList.add("results__link--active");
    }
  }

  clearList() {
    this.element.innerHTML = "";
  }
}

export const ResultList = new $ResultList();

// window.checkImg = () => {
//     console.log(ResultList.img.complete);
// }
