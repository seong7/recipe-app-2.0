// 앱 전체에 대한 state
// 미리 정해둔 key 들만 저장할 수 있음

class State {
    constructor() {
        this.search;
        this.recipe;
        this.likes;
        this.list;
        this.key = ["search", "recipe", "likes", "list", "test"];

        this.test = ["Test Pass"];
    }
    set(key, value){
        if(this.key.find((c) => c === key)){
            this[key] = this.get(key) ? this.get(key) : value;
            return this[key];
        }
        else {
            return new Error("정해진 key 만 set 가능")
        }
    }
    update(key, value){
        // 대기
    }
    get(key) {
        return this[key];
    }
    keys() {
        return this.key;
    }
}
const state = new State();
export default state;