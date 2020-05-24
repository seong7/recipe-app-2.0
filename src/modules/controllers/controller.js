import state from "../state/state.js";
import * as view from "../views/views.js";
import {SearchModel, RecipeModel, LikesModel} from "../models/models.js";

// 작업용
window.state = state;

// 최초 init controller
export const initController = () => {
    const Header = view.Header;
    const Nav = view.Nav;
    const Main = view.Main;

    Header.render(document.querySelector("#App"));
    Nav.render(document.querySelector("#App"));
    Main.render(document.querySelector("#App"));

    const search = state.set("search", new SearchModel());
    const likes = state.set("likes", new LikesModel());
    const recipe = state.set("recipe", new RecipeModel());
    
    if(localStorage["lastSearch"] && localStorage["lastId"]){
        searchController(localStorage.getItem("lastSearch"));
        recipeController(localStorage.getItem("lastId"));
        
    
        // url 의 hash 값 초기화
        document.location.hash = localStorage.getItem("lastId");
    }else{
        document.location.hash = "";
    }
    likeController();

    // hashchange 이벤트로 recipe controller 동작
    // 현재 앱에서 a tag 들을 클릭하면 # 값 변함
    window.addEventListener("hashchange", recipeController);
}

// Search 기능 controller
export const searchController = async (query) => {
    const Nav = view.Nav;
    const Loader = view.Loader;

    Nav.clearNav();

    if(query) {
        Loader.render(Nav.element, "nav");
        const search = state.get("search");
        
        try {
            await search.getResults(fetch, query);
            // console.log(state);
            Nav.renderList(search.result);

            localStorage.setItem("lastSearch", query);
        }
        catch(error) {
            if(error.message === "해당 음식 정보가 없습니다.") alert(error.message);
            else throw error;
        }
        finally{
            Loader.remove("nav");
        }
    }
}

// LIke 기능 controller
export const likeController = () => {
    // 1. like 생성 (현재 recipe 의 id 로 사용)
    // 2. localhost 에 저장
    // 3. localhost -> state
    // 4. Header LikesPanel 에 render

    // console.log("likeController");

    const Likes = view.Likes;
    const likes = state.get("likes");
    const recipe = state.get("recipe");
    if(recipe.result){
        const {recipe_id, title, publisher, image_url} = recipe.result;
        if(!likes.isLiked(recipe_id)){
            likes.addLike(recipe_id, title, publisher, image_url);
        }else{
            likes.removeLike(recipe_id);
            // console.log(state.likes);
        }
        likes.persistData();
    }

    Likes.renderLikes(likes.getLikes());
}

// Recipe 기능 controller
export const recipeController = async () => {
    const rId = window.location.hash.replace("#", "");
    // console.log("recipeController")

    const Main = view.Main;
    const Loader = view.Loader;
    const ResultList = view.ResultList;
    const recipe = state.get("recipe");
    const likes = state.get("likes");

    if(rId) {
        Main.clear();
        Loader.render(Main.element, "main");
        try {
            await recipe.getRecipe(fetch, rId);
            // console.log(res);
            recipe.parseIngredients();
            recipe.calcTime();
            recipe.calcServings();
            
            Main.renderRecipe(recipe.result, likes.isLiked(rId));

            ResultList.hightlightSelected(rId);
            localStorage.setItem("lastId", rId);
        }
        catch (e) {
            if(e.message === "해당 Recipe 정보가 없습니다.") alert(e.message);
            else throw e;
        }
        finally{
            Loader.remove("main");
        }
        // await 
    }
}

// Ingredient 기능 controller 