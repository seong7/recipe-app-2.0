import * as view from "../views/index.js";

export const initController = () => {

    const Header = view.Header;
    Header.render(document.querySelector("#App"));
    // console.log("controller");
}

export const searchController = (query) => {
    console.log("dddd");
    
}
