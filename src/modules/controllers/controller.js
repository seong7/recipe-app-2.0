import state from "../state/state.js";
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
        const search = state.set("search", new SearchModel());
        
        try {
            await search.getResults(fetch, query);
            // console.log(state);
            Nav.renderList(search.result);
        }
        catch(error) {
            if(error.message === "해당 음식 정보가 없습니다.") alert(error.message);
            else console.log(error);
        }
        finally{
            loader.remove("nav");
        }
    }
}

// LIke 기능 controller
export const likeController = () => {
    // 1. like 생성 (현재 recipe 의 id 로 사용)
    // 2. state 에 저장
    // 3. 
}

// Recipe 기능 controller
export const recipeController = () => {
    // 1. 
}

// Ingredient 기능 controller 