import state from "../../../controllers/state.js"
import {ResultList, PageBtn} from "../../views.js";

class $Nav {
    constructor () {
        this.element = document.createElement("nav");
        this.element.className = "nav results"
        this.addEvent();
    }

    render (target) {
        target.appendChild(this.element);
    }

    renderList (searchResults, page = 1) {
        this.clearNav();
        this.element.appendChild(ResultList.render(searchResults, page, 10));
        // 아래는 페이지 버튼
        this.element.insertAdjacentHTML("beforeend", PageBtn.render(page, searchResults.length, 10));
    }

    clearNav () {
        this.element.innerHTML = "";
    }

    addEvent () {
        this.element.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-inline");
            // 부모 자식 간에서 가장 가까운 .btn-inline (event delegation 이용)
            // console.log(btn);

            if(btn) {
                const goToPage = parseInt(btn.dataset.goto, 10); // 10 진수로 바꿈
                this.renderList(state.search.result, goToPage);
            }
        })
    }
}

export const Nav = new $Nav();