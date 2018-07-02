import { elements, elementStrings } from './base';

export const getInput = () => elements.searchInput.value; //1 line inplicit return no need to write return

export const clearInput = () =>{
    elements.searchInput.value = ''; 
} ;

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelectd = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));

    for (const el of resultsArr) {
        el.classList.remove('results__link--active');
    }
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

/*
//Pasta with tomato and spinach
acc 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'tomato']
acc 15 / acc + cur.length = 5 / newTitle = ['Pasta'] length is more than 17 and 'and' dont fit
acc 0 / acc + cur.length = 5 / newTitle = ['Pasta']
*/

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
      /* Split
        [Pasta,with,tomato,and,spinach]
      */
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                //if 0+5 <= 17 push to array till its more than 17
                newTitle.push(cur);
            } 
            // at this example Pasta,with,tomato -> beacuse length is 17 and 'and 'dont fit
            return acc + cur.length;
        }, 0);
        //return spaces betwen words and if limit is more than 17 adds ...
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

//for only 1 recipe
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//Only button markup
//type 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
    <span>${type === 'prev' ? page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;


const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);

    let button;
    if(page === 1 && pages > 1){
        //Pirst page - Only button got o next
        button = createButton(page, 'next');
    } else if(page < pages){
        //Both buttons
        button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `;

    } else if(page === pages && page > 1){
        //Last page - Only pervous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

//for all recipes from one recipe. passing all recipes in recipes argument
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // recipes.forEach(renderRecipe);
    for (const allrecipes of recipes.slice(start, end)){
        renderRecipe(allrecipes);
    };

    //render the pagination buttons
    renderButtons(page, recipes.length, resPerPage)
          
};