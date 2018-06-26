import Search from './models/Search';

//Global state of our app (current moment -state, what we have)
/*
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async() => {
    // 1) Get query from view
    const query = 'pizza';

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query); // query:'pizza'

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) render results on UI
        console.log(state.search.result); // result array

        console.log(state);
    }

};

document.querySelector('.search').addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});
