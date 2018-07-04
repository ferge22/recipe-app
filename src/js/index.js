import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView' //searchView is an object witch has all exported variables
import * as recipeView from './views/recipeView'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';

//Global state of our app (current moment -state, what we have)
/*
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

/*----SEARCH CONTROLLER----*/

const controlSearch = async() => {
    // 1) Get query from view
    const query = searchView.getInput();

    if(query){
        // 2) New search object and add to state
        let a = state.search = new Search(query); // query:'pizza'
        console.log(a);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
        // 4) Search for recipes
        await state.search.getResults();

        // 5) render results on UI
        // console.log(state.search.result); // result array
        clearLoader();
        searchView.renderResults(state.search.result);

        }catch(error){
            alert('Error processing recipe!');
            clearLoader();
        }

        console.log(state);

    }

};

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*----RECIPE CONTROLLER----*/

const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        //Prepare Ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected recipe
        if(state.search) searchView.highlightSelectd(id);

        //Create new recipe object
        state.recipe = new Recipe(id);

        try{
            //Get recipe data and parse Ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);


        }catch(error){
            alert('Error processing recipe!');
        }

    }

};

/*----List CONTROLLER----*/

const controlList = () => {
    //Create a new list if there is none
    if(!state.list) state.list = new List();

    //Add each ingredient to the list
    for (const el of state.recipe.ingredients) {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
    }

}


// window.addEventListener('hashchange', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

//Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    // * any child of btn decrease
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //deacrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        //increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn--add, recipe__btn--add *')){

    }

    // console.log(state.recipe);
});




window.l = new List();