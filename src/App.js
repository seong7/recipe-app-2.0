import {initController} from "./modules/controllers/controller.js";

export default class App {
    $target = null
    dashboard = null

    constructor($target) {
        this.$target = $target

        initController();
    }
}