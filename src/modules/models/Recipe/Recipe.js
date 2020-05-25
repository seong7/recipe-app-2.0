export class RecipeModel {
  constructor() {
    this.result;
  }

  getRecipe(fetch, id) {
    if (id) {
      const res = fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
        .then((r) => r.json())
        .then((r) => {
          if (r["error"]) throw new Error("해당 Recipe 정보가 없습니다."); // 예외 처리
          this.result = r.recipe; // 비동기 이므로 then 안에서 assign 해야함
          return this.result;
        })
        .catch((e) => {
          throw e;
        });
      // this.result = id;
      // this.title = res.title;
      // this.author = res.publisher;
      // this.img = res.image_url;
      // this.url = res.source_url;
      // this.ingredients = res.ingredients; // array
      return res;
    } else {
      return "no id";
    }
  }

  // 요리시간
  calcTime() {
    // Assuming that we need 15 min for each 3 ingredients
    const numIngredient = this.result.ingredients.length;
    const periods = Math.ceil(numIngredient / 3);
    this.result.time = periods * 15;
  }

  // 몇인분? _ 4로 통합(알고리즘 생략)
  calcServings() {
    this.result.servings = 4;
  }

  // 재료 format 바꾸기 (숫자 / 이름)
  parseIngredients() {

    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ]; // 위의 단위들의 요약 버전
    const units = [...unitsShort, "kg", "g"]; // 위에 kg, g 추가하는 법 예시

    const newIngredients = this.result.ingredients.map((el) => {
      // 1) Uniform units (단위 통합)
      let ingredient = el.toLowerCase(); // 소문자 변환

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, units[i]);
      });

      // 2) Remove parenthesized words
      ingredient = ingredient.replace(/\s*\([^)]*\)\s*/g, " "); // ~~~ (@@) -> ~~~
      ingredient = ingredient.replace(/,/g, ""); // ~~,~~ -> ~~~~

      // 3) Parse ingredients into an Object {count, unit and ingredient}

      const arrIng = ingredient.split(" ");

      // unit 포함되어 있는지 여부 확인
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

      // findIndex(fn) ES6 : callback fn 이 참인 첫번째 요소의 index return
      // 참인 요소가 없으면(unit 이 없으면) -1 return

      let objIng;
      const numPattern = new RegExp(
        /^[0-9]+((\.[0-9]+)|([0-9]\/[0-9]))?(-[0-9]+((\.[0-9]+)|([0-9]\/[0-9]))?)?/
      ); // 1-1.5 , 1.5-2, 1.5-2.5, 1-1/2, 1/3-1/2
      if (unitIndex > -1) {
        // There is a unit

        // const nameIng = getNameIng(arrIng, 2);

        const arrCount = arrIng.slice(0, unitIndex); // unit 이 탐색된 최초의 index exclude 로 배열 추출
        // ex) 4 cups
        // ex) 4 1/2 cups  --> eval(4+1/2)
        // ex) 4-1/2 cups --> eval(4+1/2)
        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+")); // 해당 data에서 - 는 실제로 + 를 의미하므로
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+")); // eval('4+1/2') --> 4.5
        }

        objIng = {
          // count : parseInt(arrIng[0]),
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10) || numPattern.test(arrIng[0])) {
        /* 10진수 integer 로 변환
                        string 이면 -> NaN return -> coerce to false
                    */

        // There is NO unit, but 1st element is a number

        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // There is NO unit and 1st element is NOT a number

        objIng = {
          count: 1,
          unit: "",
          ingredient,
          // --> ingredient : ingredient 와 같음  (ES6 문법)
        };
      }
      return objIng;
    });
    this.result.ingredients = newIngredients;
    // console.log(this.result);
    // console.log(newIngredients);
  }

  updateServings(btnType) {
    const type = btnType;
    // Serving
    const newServings = type === "dec" ? this.result.servings - 1 : this.result.servings + 1;

    // Ingredients
    this.result.ingredients.forEach((ingredient) => {
      const ing = ingredient;
      ing.count *= newServings / this.result.servings; /* 증가한 비율만큼 곱하기 */
    });

    this.result.servings = newServings;
  }
}
