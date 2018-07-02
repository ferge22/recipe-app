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

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();

            for (const [i, unit] of unitsLong.entries()) {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            }

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split('');
            //example return the position of index where el2=> turns out to be tru example unitsShort tbsp index in array;
            //jeigu atitiks salyga po el2 t,y true, grazins indexa to zodziu kuris yra units short tam arrIng
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1){
                //There is a unit
            }else if(parseInt(arrIng[0], 10)) {
                //There is No unit but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join('')
                }
            }else if(unitIndex === -1){
                //There is No unit and No number is 1st position

                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
}

