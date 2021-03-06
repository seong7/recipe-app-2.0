export class ShoppingModel{
    constructor() {
        this.data = [];
        this.readStorage();
    }

    addItem(count, unit, ingredient) {
        // console.log("addItem");
        const id = this.data[0] ? this.data[this.data.length - 1].id + 1 : 0;
        const item = {
            id,
            count,
            unit,
            ingredient,
        };
        this.data.push(item);

        this.persistData();
    }

    persistData() {
        localStorage.setItem("shopping", JSON.stringify(this.data));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem("shopping"));
        if(storage) this.data = storage;
    }

    deleteItem(id) {
        const index = this.data.findIndex((c) => c.id === id);
        // console.log(index);
        this.data.splice(index, 1);
        // console.log(this.data);
        this.persistData();
    }

    isEmpty() {
        return this.data.length === 0;
    }

    clear(){
        this.data = [];
        this.persistData();
    }

    updateCount(id, newCount) {
        this.data.find((c) => c.id === id).count = newCount;
    }
}