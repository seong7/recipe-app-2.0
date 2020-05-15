class $Loader {
    constructor() {
    }

    render (target, targetName) {
        target.insertAdjacentHTML("afterbegin", `
            <div class="${targetName}__loader loader">
                <svg>
                    <use href="./src/images/icons.svg#icon-cw"></use>
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