import * as view from "../views/views.js";

const controller = () => {

    const Header = view.Header;
    Header.test(); 
    Header.render(document.querySelector("#App"));
    console.log("controller");
}

export default controller;