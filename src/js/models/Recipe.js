import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(id){
        this.id = id;
    }

    async getRecipe(id) {
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch(error){
            alert('Something went wrong! :(');
        }

    }

    calcTime(){
         //assuming that we need 15mins for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15; 
    }

     calcServings(){
        this.servings = 4;
    }
}