export default class Likes{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = {id, title, author, img};
        this.likes.push(like);

        //Persist data in localstorage
        this.persistData();

        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el=>el.id = id);
        this.likes.splice(index, 1);

        //Persist data in localstorage
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        //turns and pushes data into a string in localstorage
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        //gets datata from local storage and reparses it from string
        const storage = JSON.parse(localStorage.getItem('likes'));

        //restoring likes from localstorage
        if(storage) this.likes = storage;
    }
}