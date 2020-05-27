import {ShoppingList} from "./ShoppingList/ShoppingList.js";

class $ShoppingModal {

    data = {
        visible: false,
    };

    constructor(){
        this.element = document.createElement("div");
        this.element.className = "shopping__modal-wrapper hidden";
        
        this.modal = document.createElement("div");
        this.modal.className = "shopping__modal-content";
        this.modal.insertAdjacentElement("afterbegin", this.createModalHeader());
        
        this.element.appendChild(this.modal);
        this.addEvent();
        
    }

    setState(data) {
        this.data = data;
        // console.log(this.data);
        this.render(); 
    }

    createModalHeader() {
        const header = document.createElement("div");
        header.className = "shopping__modal-header";

        const h2 = document.createElement("h2");
        h2.className = "heading-2";
        h2.textContent = "Shopping List";

        const btns = document.createElement("div");
        btns.className = "shopping__modal-btns";
        ["copy", "clear"].forEach((c) => {
            const btn = document.createElement("button");
            btn.className = `shopping__${c} btn-small btn-short`;
            btn.textContent = c;
            btns.appendChild(btn);
            // btn-small btn-short shopping__clear
        })
        
        header.appendChild(h2);
        header.appendChild(btns);
        return header;
    }

    createShoppingList() {
        const list = this.data.shopping;
        ShoppingList.setState({
            list,
            target: this.modal,
        })
    }

    close() {
        this.setState({
            ...this.data,
            visible: false,
        })
    }

    render(){
        if (this.data.visible) {
            this.createShoppingList();
            
            this.element.classList.toggle("hidden", false)
            setTimeout(() => {
                this.modal.classList.toggle("visible", true);
            }, 1); // 시간차 줘야 transition height 가 동작함
        }
        else {
            this.element.classList.toggle("hidden", true)
            this.modal.classList.toggle("visible", false);
            
        }
    }

    addEvent(){
        this.element.addEventListener("click", (e) => {
            // console.log(e.target);
            if(e.target.classList.contains("shopping__modal-wrapper")){
            // if(e.target.classList.contains("shopping__modal-content")){
                this.close();
            }
        })

        function handleEscapeKey (e) {
            if(e.keyCode === 27 && this.data.visible){
                this.close();
            }
        }
        window.addEventListener("keyup", handleEscapeKey.bind(this));
    }


}

export const ShoppingModal = new $ShoppingModal();