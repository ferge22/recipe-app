import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = [];
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el=>el.id = id);
        //[2,8,7,5] splice(1,1) -> returns 8 array[2,7,5] mutates orignal array.
        //[2,8,7,5] slice(1,1) -> returns 8 array[2,8,7,5] does not mutates orignal array.
        this.items.splice(index, 1);
    }

    updateCount(id, newCount){
        this.item.find(el=> el.id ===id).count = newCount;
    }
}