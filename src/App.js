import { initController } from "./modules/controllers/controller.js";

export default class App {
  target = null;

  /**
   *
   * @param {HTMLElement} target
   */
  constructor(target) {
    this.target = target;

    initController();
  }
}
