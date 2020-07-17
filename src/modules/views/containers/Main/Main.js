import { LikesBtn, IngredientsList, Image } from "../..";
import { shoppingController } from "../../../controllers/controller.js";
import { RecipeModel } from "../../../models/models.js";

class Main {
  /**
   *
   * @param {RecipeModel} recipeModel
   */
  constructor(recipeModel) {
    this.recipeModel = recipeModel;

    this.likesBtn = new LikesBtn();
    this.ingredientsList = new IngredientsList();

    const main = document.createElement("main");
    main.className = "main recipe";

    this.element = main;

    this.addEvent();
  }

  render(target) {
    target.appendChild(this.element);
  }

  /**
   * @param {Object} recipe
   * @param {boolean} isLiked
   */
  renderRecipe(recipe, isLiked) {
    //   console.log(recipe);
    const markup = `
            ${
              /*<figure class="recipe__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>*/ ``
            }
            <div class="sides__btns">
            ${
              /*
            isTouchScreen
                ? "<button class='results__toggle'>  <!--<i class='fas fa-bars'></i>-->  <i class='fas fa-angle-double-left'></i>  </button> <button class='shopping__scroll'>  <i class='fas fa-cart-arrow-down'></i>  </button>"
                : ""
            */ ``
            }
            </div>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="images/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.time
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="images/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="images/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="images/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                ${
                  /*<button class="recipe__love">
                    <svg class="header__likes">
                        <use href="images/icons.svg#icon-heart${
                           isLiked ? "" : "-outlined"
                        }"></use>
                    </svg>
                    </button>*/ `<!-- liked btn -->`
                }
            </div>

            <div class="recipe__ingredients">
                ${
                  /*<ul class="recipe__ingredient-list">
                    recipe.ingredients
                      .map((el) => createIngredient(el))
                    .join("")
                </ul>*/ `<!-- recipe ul -->`
                }
                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="images/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">
                        ${recipe.publisher}
                    </span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
                  recipe.source_url
                }" target="_blank"> 
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="images/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
        `;

    this.element.insertAdjacentElement(
      "afterbegin",
      this.createImageFigure(recipe.image_url, recipe.title, recipe.title)
    );
    this.element.insertAdjacentHTML("beforeend", markup);
    this.likesBtn.render(document.querySelector(".recipe__details"), isLiked);
    this.ingredientsList.render(
      document.querySelector(".recipe__ingredients"),
      recipe.ingredients
    );
  }

  /**
   *
   * @param {string} src
   * @param {string} alt
   * @param {string} title
   */
  createImageFigure(src, alt, title) {
    /*<figure class="recipe__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>*/

    const figure = document.createElement("figure");
    figure.className = "recipe__fig";

    const img = new Image(src, alt, "recipe__img");
    img.render(figure);

    figure.insertAdjacentHTML(
      "beforeend",
      `
        <h1 class="recipe__title">
            <span>${title}</span>
        </h1>
    `
    );

    return figure;
  }

  clear() {
    this.element.innerHTML = "";
  }

  addEvent() {
    const recipeModel = this.recipeModel;
    const ingredientList = this.ingredientsList;

    function updateServings() {
      // Update Servings & IngredientsList
      document.querySelector(".recipe__info-data--people").textContent =
        recipeModel.result.servings;
      ingredientList.render(
        document.querySelector(".recipe__ingredients"),
        recipeModel.result.ingredients
      );
    }

    this.element.addEventListener("click", (e) => {
      if (e.target.matches(".btn-decrease, .btn-decrease *")) {
        // console.log(e.target)
        if (recipeModel.result.servings > 1) recipeModel.updateServings("dec");
        updateServings();
      }
      if (e.target.matches(".btn-increase, .btn-increase *")) {
        recipeModel.updateServings("inc");
        updateServings();
      }

      if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
        shoppingController();
      }
    });
  }
}

export default Main;
