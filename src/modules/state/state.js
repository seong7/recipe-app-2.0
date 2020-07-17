class State {
  // global state of the app
  // _key 배열에 미리 정해둔 key 들만 저장할 수 있음

  constructor() {
    this.search;
    this.recipe;
    this.likes;
    this.list;
    this._key = ["search", "recipe", "likes", "shopping", "test"];

    this.test = ["Test Pass"];
  }

  /**
   * @param {string} key must be one of "search", "recipe", "likes" , "shopping", "test"
   * @param {object} value
   */
  set(key, value) {
    if (this._key.find((c) => c === key)) {
      this[key] = this.get(key) ? this.get(key) : value; // 중복 생성 방지
      return this[key];
    } else {
      throw new Error("정해진 key 만 set 가능");
    }
  }

  /**
   * @param {string} key
   */
  get(key) {
    return this[key];
  }

  get key() {
    return this._key;
  }
}

export default State;
