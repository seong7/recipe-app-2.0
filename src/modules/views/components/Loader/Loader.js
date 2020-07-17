class Loader {
  constructor() {}

  /**
   *
   * @param {HTMLElement} target
   * @param {string} targetName
   */
  render(target, targetName) {
    target.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="${targetName}__loader loader ${
        targetName === "nav" ? `large` : ``
      }">
                <svg>
                    <use href="images/icons.svg#icon-loader"></use>
                </svg>
            </div>
        `
    );
  }

  /**
   *
   * @param {string} targetName
   */
  remove(targetName) {
    const loader = document.querySelector(`.${targetName}__loader`);
    if (loader) {
      loader.parentNode.removeChild(loader);
    }
  }
}

export default Loader;
