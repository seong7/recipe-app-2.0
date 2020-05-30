class $PageBtn {
  constructor() {}

  render(page, numResults, resPerPage) {
    const pages = Math.ceil(numResults / resPerPage); // 전체 페이지 수

    let button;

    if (page === 1 && pages > 1) {
      // 다음 버튼 하나만
      button = this.createButton(page, "next");
    } else if (page < pages) {
      // 양쪽 방향 버튼
      button = `
           ${this.createButton(page, "prev")}
           ${this.createButton(page, "next")}
          `;
    } else if (page === pages && pages > 1) {
      // 이전 버튼 하나만
      button = this.createButton(page, "prev");
    }

    return button;
  }

  createButton(page, type) {
    // data-goto 속성 :: 중요 !!
    //   해당 DOM.dataset.goto  으로 값 가져올 수 있음 (HTML 5 기능)
    return `
            <button class="btn-inline results__btn--${type}"
             data-goto=${type === "prev" ? page - 1 : page + 1}>
             <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
             <svg class="search__icon">
                <use href="images/icons.svg#icon-triangle-${
                  type === "prev" ? "left" : "right"
                }"></use>
             </svg>
            </button>
        `;
  }
}

export const PageBtn = new $PageBtn();
