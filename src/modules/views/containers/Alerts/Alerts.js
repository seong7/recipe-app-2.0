class $Alerts {

    data = {
        visible : false,
        color : "",
        message: "",
        time : 1500
    }

    constructor() {
        this.element = document.createElement("div");
        this.element.className = "alert";
        
        // this.createTimeBar();
    }

    createAlert () {
        const Alert = new $Alert();
        Alert.render(this.element);
    }
        
    // createTimeBar () {
    //     this.timebar = document.createElement("div");
    //     this.timebar.className = "alert__timebar";
    //     this.element.appendChild(this.timebar);
    // }

    // createText(text) {
    //     this.message = document.createElement("span");
    //     this.message.className = "alert__message";
    //     this.message.textContent = text;
    //     this.element.insertAdjacentElement("afterbegin", this.message);
    // }

    // selectColor(color) {
    //     switch (color) {
    //         case "red" :
    //             this.element.classList.add("red")
    //             break;
    //         case "green" :
    //             this.element.classList.add("green")
    //             break;
    //     }
    // }

    setState(data) {
        // console.log(data);
        this.data = {
            ...this.data,
            ...data,
        };
        this.render();
        setTimeout(() => {
            this.data = {
                ...this.data,
                visible: false,
            };
            this.render();
        }, this.data.time);
    }

    render() {
        // if(this.data.visible) {
        //     // this.createText(this.data.message);
        //     // this.selectColor(this.data.color);
        //     this.element.classList.toggle("hidden", false);
        //     setTimeout(() => {
        //         this.element.classList.toggle("active", true);
        //     }, 50);
        // }
        // else {
        //     this.clear();
        // }
    }

    initRender($target) {
        $target.appendChild(this.element);
    }
    
    clear() {
        this.element.classList.remove("active");
        this.message.innerHTML = "";
        setTimeout(() => {
            this.element.classList.add("hidden");
        }, 100);
    }
}

export const Alerts = new $Alerts();

class $Alert {
    constructor() {
        this.element = document.createElement("div");
        // this.element.className = "alert__list"
        this.element.style.height = "100px";
        this.element.style.width = "100px";
        this.element.style.background = "red";
    }

    render($target) {
        $target.insertAdjacentElement("afterbegin", this.element);
        setTimeout(() => {
            this.remove()
        }, 5000);
    }

    remove() {
        this.element.remove();
    }
}