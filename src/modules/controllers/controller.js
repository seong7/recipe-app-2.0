import State from "../state/state.js";
import * as View from "../views";
import {
  SearchModel,
  RecipeModel,
  LikesModel,
  ShoppingModel,
} from "../models/models.js";

let state;

let header;
let nav;
let main;
let footer;
let alerts;
let loader;

// 작업용
// window.state = state;

// 최초 init controller
export const initController = () => {
  state = new State();

  const searchModel = new SearchModel();
  const recipeModel = new RecipeModel();
  const likesModel = new LikesModel();
  const shoppingModel = new ShoppingModel();

  state.set("search", searchModel);
  state.set("recipe", recipeModel);
  state.set("likes", likesModel);
  state.set("shopping", shoppingModel);

  alerts = new View.Alerts();
  header = new View.Header(state.get("shopping"), state.get("likes"), alerts);
  nav = new View.Nav(state.get("search"));
  main = new View.Main(state.get("recipe"));
  footer = new View.Footer();

  loader = new View.Loader();

  header.render(document.querySelector("#App"));
  nav.render(document.querySelector("#App"));
  main.render(document.querySelector("#App"));
  footer.render(document.querySelector("#App"));
  alerts.initRender(document.querySelector("#App"));

  if (!localStorage["lastSearch"] && !localStorage["lastId"]) {
    localStorage.setItem("lastSearch", "pizza");
    localStorage.setItem("lastId", "6fab1c");
  }
  // url 의 hash 값 초기화
  document.location.hash = localStorage.getItem("lastId");

  (async function () {
    await searchController(localStorage.getItem("lastSearch"));
    await recipeController();

    // hashchange 이벤트로 recipe controller 동작
    // 현재 앱에서 a tag 들을 클릭하면 # 값 변함
    window.addEventListener("hashchange", recipeController);

    // recipe render 와 동시에 hashchange event 가 동작하는 것 방지하기 위해
    // IFFE 형태의 async function 으로 작성
  })();
};

// Search 기능 controller
/**
 *
 * @param {string} query query to search
 */
export const searchController = async (query) => {
  // const temp = Nav.element.innerHTML;

  if (query) {
    loader.render(nav.element, "nav");
    const searchModel = state.get("search");

    try {
      await searchModel.getResults(fetch, query);
      nav.renderList(searchModel.result);
      localStorage.setItem("lastSearch", query);
    } catch (error) {
      if (error.message === "해당 음식 정보가 없습니다.") {
        // alert(error.message);
        // Alert.setState({visible: true, message: "해당 음식 정보가 없습니다.", color: "red"});
        alerts.renderAlert(error.message, "red");
        // nav.element.innerHTML = temp;
      } else throw error;
    } finally {
      loader.remove("nav");
    }
  }
};

// LIke 기능 controller
export const likeController = () => {
  // 1. like 생성 (현재 recipe 의 id 로 사용)
  // 2. localhost 에 저장
  // 3. localhost -> state
  // 4. header LikesPanel 에 render

  // console.log("likeController");

  const likes = header.likes;
  const likesModel = state.get("likes");
  const recipeModel = state.get("recipe");
  if (recipeModel.result) {
    const { recipe_id, title, publisher, image_url } = recipeModel.result;
    if (!likesModel.isLiked(recipe_id)) {
      likesModel.addLike(recipe_id, title, publisher, image_url);
    } else {
      likesModel.removeLike(recipe_id);
      // console.log(state.likes);
    }
    likesModel.persistData();
  }

  likes.renderLikes(likesModel.getLikes());
};

// Recipe 기능 controller
export const recipeController = async () => {
  const rId = window.location.hash.replace("#", "");
  // console.log("recipeController")

  const recipeModel = state.get("recipe");
  const likesModel = state.get("likes");

  if (rId) {
    main.clear();
    loader.render(main.element, "main");
    try {
      await recipeModel.getRecipe(fetch, rId);
      // console.log(res);
      recipeModel.parseIngredients();
      recipeModel.calcTime();
      recipeModel.calcServings();

      main.renderRecipe(recipeModel.result, likesModel.isLiked(rId));

      nav.resultList.hightlightSelected(rId);
      localStorage.setItem("lastId", rId);
    } catch (e) {
      if (e.message === "해당 Recipe 정보가 없습니다.") alert(e.message);
      else throw e;
    } finally {
      loader.remove("main");
    }
  }
};

// shopping 기능 controller
export const shoppingController = () => {
  const shoppingModel = state.get("shopping");
  const recipeModel = state.get("recipe");

  // console.log(recipe);
  recipeModel.result.ingredients.forEach((ing) => {
    shoppingModel.addItem(ing.count, ing.unit, ing.ingredient);
    header.toggleShoppingBtn();
  });
  alerts.renderAlert("쇼핑리스트에 저장되었습니다.", "green");
  // console.log(shopping);
};
