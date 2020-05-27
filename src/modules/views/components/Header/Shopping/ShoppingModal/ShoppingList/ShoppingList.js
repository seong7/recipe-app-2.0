class $ShoppingList {
    
    data = null
    
    constructor() {
        this.element = document.createElement("ul");
        this.element.className = "shopping__list";
    }

    setState(data) {
        this.data = data;
        console.log(this.data);
        this.render(data.target);
    }

    render($target) {
        // this.data  // loop 돌면서 createList() 
        this.data.list.forEach((item) => {
            this.element.insertAdjacentHTML("beforeend", this.createList(item));
        })
        $target.appendChild(this.element);
    }

    createList(item) {
        return `
            <li class="shopping__item" data-itemid=${item.id}>
                <div class="shopping__count">
                    <input type="text" value="${item.count}" class="shopping__count-value" readonly>
                    <p>${item.unit}</p>
                </div>
                <p class="shopping__description">${item.ingredient}</p>
                <button class="shopping__delete btn-tiny">
                    <svg>
                        <use href="./src/images/icons.svg#icon-circle-with-cross"></use>
                    </svg>
                </button>
            </li>
        `;
    }
}

export const ShoppingList = new $ShoppingList();