export class LikesModel {
    constructor() {
        this.likes = [];
        this.readStorage(); // localStorage => this.likes
    }

    addLike(recipe_id, title, publisher, image_url) {
        this.likes.push({recipe_id, title, publisher, image_url});
    }

    removeLike(recipe_id) {
        this.likes =  this.likes.filter((c) => c.recipe_id !== recipe_id);
        return this.likes;
    }

    isLiked(recipe_id) {
        return this.likes.some((c) => c.recipe_id === recipe_id); 
    }

    getLikes() {
        return this.likes;
    }

    persistData(){
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem("likes"));
        if(storage) {
            this.likes = storage;
            // console.log(this.likes);
        };
    }
}