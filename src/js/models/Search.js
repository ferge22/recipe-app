import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(query) {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '82ea3d7184d71527a978ff56e95cbc71';
        
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q${this.query}`);
            console.log(res)
            this.result = res.data.recipes;
            console.log(recepies);
        }
        catch(error){
            alert(error);
        }
    }
}
