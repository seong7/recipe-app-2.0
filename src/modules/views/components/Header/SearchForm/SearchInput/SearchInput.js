class SearchInput {
  constructor() {
    this.element = document.createElement("input");
    this.element.className = "search__field";
    this.element.setAttribute("type", "text");
    this.element.setAttribute("placeholder", "try pizza, pasta, fries ...");
  }

  clearInput() {
    this.element.value = "";
  }
  getInput() {
    return this.element.value;
  }
}

export default SearchInput;
