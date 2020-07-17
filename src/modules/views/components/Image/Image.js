class Image {
  /**
   *
   * @param {string} src
   * @param {string} alt
   * @param {string} className
   */
  constructor(src, alt, className) {
    this.src = src;
    this.alt = alt;
    this.className = className;

    this.createLoader();
    this.createImg();
  }

  createLoader() {
    const loader = document.createElement("div");
    loader.className = "loader nav";
    loader.insertAdjacentHTML(
      "afterbegin",
      `
            <svg>
                <use href="images/icons.svg#icon-loader"></use>
            </svg>
        `
    );
    this.loader = loader;
  }

  createImg() {
    const img = document.createElement("img");
    img.src = this.src;
    img.alt = this.alt;
    img.className = `${this.className ? this.className : ``} hidden`;
    img.onload = this.onload.bind(this);
    this.img = img;
  }

  /**
   *
   * @param {HTMLElement} target
   */
  render(target) {
    target.insertAdjacentElement("afterbegin", this.loader);
    target.insertAdjacentElement("afterbegin", this.img);
  }

  onload() {
    this.loader.remove();
    this.img.classList.remove("hidden");
    // console.log("완료");
  }
}

export default Image;
