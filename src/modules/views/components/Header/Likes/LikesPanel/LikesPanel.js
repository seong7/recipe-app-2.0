class $LikesPanel {
    constructor() {
        this.element = document.createElement("div");
        this.element.className = "likes__panel";
        const ul = document.createElement("ul");
        ul.className = "likes__list";
        this.element.appendChild(ul);

        this.markup = `
        <div class="likes__panel">
          <ul class="likes__list">

            <!-- 임시 -->
            
              <li>
                  <a class="likes__link" href="#23456">
                      <figure class="likes__fig">
                          <img src="./src/images/test-1.jpg" alt="Test">
                      </figure>
                      <div class="likes__data">
                          <h4 class="likes__name">Pasta with Tomato ...</h4>
                          <p class="likes__author">The Pioneer Woman</p>
                      </div>
                  </a>
              </li>
                      
          </ul>
        </div>
        `;
        this.addLikes();
    }

    addLikes () {
        const like = new Like();
        this.element.lastChild.appendChild(like.element);
    }
}

class Like {
    constructor() {
        this.element = document.createElement("li");
        this.element.insertAdjacentHTML("afterbegin", `
            <a class="likes__link" href="#23456">
                <figure class="likes__fig">
                    <img src="./src/images/test-1.jpg" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">Pasta with Tomato ...</h4>
                    <p class="likes__author">The Pioneer Woman</p>
                </div>
            </a>
        `);
    }
}

export const LikesPanel = new $LikesPanel();