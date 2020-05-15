class $ResultList {
    constructor() {
        const ul = document.createElement("ul");
        ul.className = "results__list"
        this.element = ul;
    }

    render (results, page, resPerpage) {
        // 페이지 별 render 할 results 배열 내 index 지정
        const start = (page - 1) * resPerpage;
        const end = page * resPerpage;

        this.clearList();
        results.slice(start, end).forEach((c) => this.addLi(c));
        return this.element;
    }

    addLi (result) {
        // a 태그에 href = "#..." 하면 page reload 안함 
        const markup = `
        <li>
            <a class="results__link" href="#${result.recipe_id}">
                <figure class="results__fig">
                    <img src="${result.image_url}" alt="${result.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${/*limitRecipeTitle(result.title)*/result.title}</h4>
                    <p class="results__author">${result.publisher}</p>
                </div>
            </a>
        </li>
        `;
      this.element.insertAdjacentHTML("beforeend", markup);
    }

    clearList() {
        this.element.innerHTML = "";
    }
}

export const ResultList = new $ResultList(); 