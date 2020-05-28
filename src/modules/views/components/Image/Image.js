export class Image {

    constructor(src, alt, $class) {
        this.createLoader();
        this.createImg(src, alt, $class);
    }

    createLoader() {
        const loader = document.createElement("div");
        loader.className = "loader nav";
        loader.insertAdjacentHTML("afterbegin", `
            <svg>
                <use href="./src/images/icons.svg#icon-loader"></use>
            </svg>
        `)
        this.loader = loader;
    }

    createImg(src, alt, $class) {
        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.className = `${$class ? $class : ``} hidden`;
        img.onload = this.onload.bind(this);
        this.img = img;
    }

    render($target) {
        $target.insertAdjacentElement("afterbegin", this.loader);
        $target.insertAdjacentElement("afterbegin", this.img);
    }

    onload() {
        this.loader.remove();
        this.img.classList.remove("hidden");
        // console.log("완료");
    }

}