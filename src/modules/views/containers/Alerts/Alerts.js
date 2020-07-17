class Alerts {
  data = {
    color: "",
    message: "",
    time: 5,
  };

  constructor() {
    this.element = document.createElement("div");
    this.element.className = "alert";
  }

  /**
   * @param {string} message
   * @param {string} color
   */
  renderAlert(message, color) {
    this.data = {
      ...this.data,
      message,
      color,
    };
    // console.log(message);
    // console.log(color);
    // console.log(this.data);

    this.alert = new Alert(this.data);
    this.alert.render(this.element);
  }

  /**
   * @param {HTMLElement} target
   */
  initRender(target) {
    target.appendChild(this.element);
  }
}

class Alert {
  data = {
    time_end: 0.5,
  };

  /**
   * @param {object}
   */
  constructor({ message, color, time }) {
    this.element = document.createElement("div");
    this.element.className = `alert__item ${color}`;
    this.element.style.transition = `all ${this.data.time_end}s`;

    const span = document.createElement("span");
    span.className = "alert__item-message";
    span.textContent = message;

    const timebar = document.createElement("div");
    timebar.className = `alert__item-timebar ${color}`;
    timebar.style.transition = `width ${time}s`;
    // width 0s ease 0s, height 5s ease 0s
    this.timebar = timebar;

    this.data = {
      ...this.data,
      time: time * 1000,
    };

    this.element.append(span);
    this.element.append(timebar);

    this.addEvent();
  }

  /**
   * @param {HTMLElement} target
   */
  render(target) {
    function timeout(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }

    const asyncWork = async () => {
      target.insertAdjacentElement("afterbegin", this.element);
      await timeout(100); // 너무 짧게 주면 거의 동기적으로 동작하게 되는 버그 발생
      this.element.classList.add("start");
      this.timebar.classList.add("start");
      await timeout(this.data.time);
      this.element.classList.add("end");
      await timeout(this.data.time_end * 1000);
      this.remove();
    };

    asyncWork();
  }

  remove() {
    this.element.remove();
  }

  addEvent() {
    this.element.addEventListener("click", () => {
      this.element.classList.add("end");
    });
  }
}

export default Alerts;
