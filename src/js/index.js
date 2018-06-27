import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView' //searchView is an object witch has all exported variables
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
            alert('Error processing recipe!')
        }

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
// const r = new Recipe(47746);
// r.getRecipe();
// console.log(r);

const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        //Prepare Ui for changes

        //Create new recipe object
        state.recipe = new Recipe(id);

        try{
            //Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            console.log(state.recipe);

        }catch(error){
            alert('Error processing recipe!');
        }

    }

};

// window.addEventListener('hashchange', controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));