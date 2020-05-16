import { SearchModel, RecipeModel } from "../modules/models/models.js";

// 검색기능 test
describe("\n => Search Model", () => {
  const Search = new SearchModel();
  const expectedResult = {
    count: 28,
    recipes: [
      {
        image_url:
          "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg",
        publisher: "101 Cookbooks",
        publisher_url: "http://www.101cookbo,oks.com",
        recipe_id: "47746",
        social_rank: 100,
        source_url: "http://www.101cookbooks.com/archives/001199.html",
        title: "Best Pizza Dough Ever",
      },
      {
        image_url: "http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg",
        publisher: "The Pioneer Woman",
        publisher_url: "http://thepioneerwoman.com",
        recipe_id: "46956",
        social_rank: 100,
        source_url: "http://thepioneerwoman.com/cooking/2012/01/fruit-pizza/",
        title: "Deep Dish Fruit Pizza",
      },
    ],
  };

  // test 1
  it("getResults() -> query 없을 때", () =>
    expect(Search.getResults()).toBe("no query"));

  // test 2
  it("getResults() -> API Call 정상", (done) => {
    const fetchMock = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve(expectedResult), // json() 까지만 선언해줌
      })
    );

    return Search.getResults(fetchMock, "pizza").then((result) => {
      // mock fn Test
      expect(fetchMock).toBeCalledWith(
        "https://forkify-api.herokuapp.com/api/search?q=pizza"
      );
      // 본 함수 Test
      // toEqual : 배열 또는 객체에 대한 일치 여부 확인
      expect(result).toEqual(expectedResult.recipes); // 최종 equal 값에서 원하는 속성 지정
      done();
    });
  });

  // test 3
  it("getResults() -> ERROR : 검색결과 없을 때", (done) => {
    const fetchMock = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve({ error: "error message" }), // 결과에서 error 속성을 체크하는 함수이므로 이렇게 넣어줌
      })
    );
    return Search.getResults(fetchMock, "ccc")
      .then((result) => {
        // mock fn Test 는 필요없음
      })
      .catch((e) => {
        // 본 함수 Error Test
        expect(e).toEqual(new Error("해당 음식 정보가 없습니다."));
        done();
      });
  });
});



// Recipe 가져오기 기능 TEST
describe("\n => Recipe Model", () => {
  const Recipe = new RecipeModel();
  const expectedResult = {
    recipe: {
      image_url:
        "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg",
      ingredients: (6)[
        ("4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled",
        "1 3/4 (.44 ounce) teaspoons salt",
        "1 teaspoon (.11 ounce) instant yeast",
        "1/4 cup (2 ounces) olive oil (optional)",
        "1 3/4 cups (14 ounces) water, ice cold (40F)",
        "Semolina flour OR cornmeal for dusting")
      ],
      publisher: "101 Cookbooks",
      publisher_url: "http://www.101cookbooks.com",
      recipe_id: "47746",
      social_rank: 100,
      source_url: "http://www.101cookbooks.com/archives/001199.html",
      title: "Best Pizza Dough Ever",
    },
  };

  // test 1
  it("getRecipe() -> id 없을 때", () =>
    expect(Recipe.getRecipe()).toBe("no id"));

  // test 2    
  it("getRecipe() -> API Call 정상", (done) => {
    const fetchMock = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve(expectedResult), // json() 까지만 선언해줌
      })
    );
    return Recipe.getRecipe(fetchMock, "47746").then((result) => {
      // mock fn Test
      expect(fetchMock).toBeCalledWith(
        "https://forkify-api.herokuapp.com/api/get?rId=47746"
      );
      // 본 함수 Test
      // toEqual : 배열 또는 객체에 대한 일치 여부 확인
      expect(result).toEqual(expectedResult.recipe); // 최종 equal 값에서 원하는 속성 지정
      done();
    });
  });

  // test 3
  it("getRecipe() -> ERROR : Recipe 결과 없을 때", (done) => {
    const fetchMock = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () => Promise.resolve({ error: "error message" }), // 결과에서 error 속성을 체크하는 함수이므로 이렇게 넣어줌
      })
    );
    return Recipe.getRecipe(fetchMock, "451654621321")
      // .then((result) => {
      //   // mock fn Test 는 필요없음
      // })
      .catch((e) => {
        // 본 함수 Error Test
        expect(e).toEqual(new Error("해당 Recipe 정보가 없습니다."));
        done();
      });
  });
});
