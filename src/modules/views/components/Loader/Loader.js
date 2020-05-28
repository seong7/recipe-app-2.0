class $Loader {
    constructor() {
    }

    render (target, targetName) {
        target.insertAdjacentHTML("afterbegin", `
            <div class="${targetName}__loader loader ${targetName === "nav" ? `large`:``}">
                <svg>
                    <use href="./src/images/icons.svg#icon-loader"></use>
                </svg>
            </div>
        `);
    }

    remove (targetName) {
        const loader = document.querySelector(`.${targetName}__loader`);
        if(loader){
            loader.parentNode.removeChild(loader);
        }
    }
}

export const Loader = new $Loader();