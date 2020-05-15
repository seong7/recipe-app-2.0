export class SearchModel {
    constructor () {
        this.result;
    }

    // async / await 를 선언해주니 TEST 에서 오류가 남 (@babel/polyfill 을 쓰면 되는데 써도되는지 몰라서 우선 없는채로 진행)
    getResults(fetch, query) {
        if(query) {
            // try{
                const res = fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
                    .then((r) => r.json())
                    .then((r) => {
                        if(r["error"]) throw new Error("해당 음식 정보가 없습니다."); // 예외 처리
                        this.result = r.recipes; 
                        return this.result;
                    })
                    .catch((e) => {
                        throw e;
                    });
                return res;
            
            // async await 를 못쓰니까 try catch 가 필요 없음 (async await 일 때는 동작함)

            // }
            // catch (error) {
            //     console.log("ccccccccc");
            //     // alert("해당 음식 정보가 없습니다.");
            // }
        }
        else {
            return "no query";
        }
    }
}