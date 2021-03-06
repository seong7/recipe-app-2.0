import State from "../modules/state/state.js";

const state = new State();

describe("\n => State", () => {
  it("state key 배열 return", () =>
    expect(state.key).toEqual([
      "search",
      "recipe",
      "likes",
      "shopping",
      "test",
    ]));

  it("state.set() 에 정해지지 않은 키 넣을 때 ", () => {
    try {
      state.set("testKey", "testVal"); // error 발생하는 함수 실행
    } catch (e) {
      expect(e.message).toBe("정해진 key 만 set 가능");
    }
  });

  const notExpected = ["notExpected"];
  it("state.set() 에 기존에 있는 값 넣을 때는 기존 값 return", () =>
    expect(state.set("test", notExpected)).toEqual(["Test Pass"]));

  const updatedVal = ["updated value"];
  it.todo("state.update() 로 기존 값 변경 가능"); // .todo 는 설명문이랑만 호출 가능
});
