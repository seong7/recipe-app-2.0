import state from "./state.js";
import * as view from "../views/views.js";
import {SearchModel} from "../models/models.js";

// 최초 render controller
export const initController = () => {
    const Header = view.Header;
    const Nav = view.Nav;

    Header.render(document.querySelector("#App"));
    Nav.render(document.querySelector("#App"));
}

// Search 기능 controller
export const searchController = async (query) => {
    const Nav = view.Nav;
    const loader = view.Loader;

    Nav.clearNav();

    if(query) {
        loader.render(Nav.element, "nav");
        state.search = state.search ? state.search : new SearchModel();
        // state.search = new SearchModel();

        try {
            await state.search.getResults(fetch, query);
            // console.log(state);

            Nav.renderList(state.search.result);
        }
        catch(error) {
            if(error.message === "해당 음식 정보가 없습니다.") alert(error.message);
            else console.log(error);
        }
        finally{
            loader.remove("nav");
        }
    }

    // 결과 state 에 담겨 있음
    // 결과 출력 및 페이지네이션 작업
    // loader 작업
}

// LIke 기능 controller
export const likeController = () => {
    // 1. like 생성 (현재 recipe 의 id 로 사용)
    // 2. state 에 저장
    // 3. 
}

// Recipe 기능 controller
export const recipeController = () => {

}

// Ingredient 기능 controller 