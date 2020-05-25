class $List {

    createIngredient (ingredient) {
      // console.log(ingredient);
        return `
            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="./src/images/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${this.formatCount(ingredient.count)}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.ingredient}
                </div>
            </li>
        `;
    }

    formatCount = (count) => {
      // console.log(count);
        if (count) {
          let newCount = count;
          const [int, dec] = newCount.toString().split(".");

          // 원래 integer 인 경우
          if (!dec) {
            return newCount;
          }

          // 소수점 아래 2 자리에서 자른다.
          //  0.33333 -> 0.33
          if(dec.length > 2) {
            const newDec = dec.substr(0, 2);
            newCount = [int, newDec].join(".");
          }
          return newCount;
        }
        else {
          return "?";
        }
      };
}

export const List = new $List();