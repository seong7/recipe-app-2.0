class $LikesPanel {
    constructor() {
        this.element = document.createElement("div");
        this.element.className = "likes__panel";
        this.ul = document.createElement("ul");
        this.ul.className = "likes__list";
        this.element.appendChild(this.ul);

        // this.markup = `
        // <div class="likes__panel">
        //   <ul class="likes__list">

        //     <!-- 임시 -->
            
        //       <li>
        //           <a class="likes__link" href="#47746">
        //               <figure class="likes__fig">
        //                   <img src="./src/images/test-1.jpg" alt="Test">
        //               </figure>
        //               <div class="likes__data">
        //                   <h4 class="likes__name">Pasta with Tomato ...</h4>
        //                   <p class="likes__author">The Pioneer Woman</p>
        //               </div>
        //           </a>
        //       </li>
                      
        //   </ul>
        // </div>
        // `;
        
        // this.renderLikes();
    }

    renderLikes (likesArray) {
        this.ul.innerHTML = "";

        const Like = new $Like();
        likesArray.forEach((like) => {Like.renderLike(this.ul, like)});
        this.blinkLikesPanel(likesArray.length);
    }

    blinkLikesPanel (numOfLikes) {
        if(numOfLikes > 0) {
            this.element.style.opacity = 1;
            this.element.style.visibility = "visible";
        }
        setTimeout(() => {
            this.element.style.opacity = "";
            this.element.style.visibility = "";
        }, 1000);
    }
}

class $Like {
    constructor() {
        this.likes = [];
    }

    renderLike($target, like){
        $target.appendChild(this.createLike(like));
    }

    createLike(like) {
        const $li = document.createElement("li");
        $li.insertAdjacentHTML("afterbegin", this.markUp(like));
        // this.likes.push($li);
        return $li;
    }

    markUp ({image_url, publisher, recipe_id, title}) {
        return `
            <a class="likes__link" href="#${recipe_id}">
                <figure class="likes__fig">
                    <img src="${image_url}" alt="${title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${title}</h4>
                    <p class="likes__author">${publisher}</p>
                </div>
            </a>
        `;
    }
}

export const LikesPanel = new $LikesPanel();