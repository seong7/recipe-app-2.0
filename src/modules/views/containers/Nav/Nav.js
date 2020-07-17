import { ResultList, PageBtn } from "../..";
import { SearchModel } from "../../../models/models.js";

class Nav {
  /**
   *
   * @param {SearchModel} searchModel
   */
  constructor(searchModel) {
    this.searchModel = searchModel;

    this.resultList = new ResultList();
    this.pageBtn = new PageBtn();

    this.element = document.createElement("nav");
    this.element.className = "nav results";
    this.addEvent();
  }

  /**
   *
   * @param {HTMLElement} target
   */
  render(target) {
    target.appendChild(this.element);
  }

  /**
   *
   * @param {Array} searchResults
   * @param {number} page
   */
  renderList(searchResults, page = 1) {
    const list = this.resultList.render(searchResults, page, 10);
    this.clearNav();
    this.element.appendChild(list);
    // 아래는 페이지 버튼
    this.element.insertAdjacentHTML(
      "beforeend",
      this.pageBtn.render(page, searchResults.length, 10)
    );
  }

  clearNav() {
    this.element.innerHTML = "";
  }

  addEvent() {
    this.element.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-inline");
      // 부모 자식 간에서 가장 가까운 .btn-inline (event delegation 이용)
      // console.log(btn);

      if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // 10 진수로 바꿈
        this.renderList(this.searchModel.result, goToPage);
      }
    });
  }
}

export default Nav;
