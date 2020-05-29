class $Alerts {

    data = {
        color : "",
        message: "",
        time : 5
    }

    constructor() {
        this.element = document.createElement("div");
        this.element.className = "alert";
    }

    renderAlert (message, color) {
        this.data = {
            ...this.data,
            message,
            color,
        }
        // console.log(message);
        // console.log(color);
        // console.log(this.data);

        const Alert = new $Alert(this.data);
        Alert.render(this.element);
    }
        

    initRender($target) {
        $target.appendChild(this.element);
    }
}

class $Alert {
    data = {
        time_end : 0.5,
    };

    constructor({message, color, time}) {
        this.element = document.createElement("div");
        this.element.className = `alert__item ${color}`
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
            time: time * 1000
        };

        this.element.append(span);
        this.element.append(timebar);
    }

    render($target) {
        function timeout (time) {
            return new Promise ((resolve) => {
                setTimeout(() => {
                    resolve();
                }, time)
            })
        } 
        
        const asyncWork = async () => {
            $target.insertAdjacentElement("afterbegin", this.element);
            await timeout(10);
            this.element.classList.add("start");
            this.timebar.classList.add("start");
            await timeout(this.data.time);
            this.element.classList.add("end");
            await timeout(this.data.time_end * 1000);
            this.remove()
        }

        asyncWork();
    }

    remove() {
        this.element.remove();
    }
}

export const Alerts = new $Alerts();