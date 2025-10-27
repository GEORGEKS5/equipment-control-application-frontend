/**
 * Получает ID из списка по значению
 * @param {*} list Список, в которой производится поиск
 * @param {*} value Значение
 * @returns Идентификатор
 */
function getIdByValue(list, value){
    let findOb;
    let listKeys = Object.keys(list);
    let keysCount = listKeys.length;

    if(keysCount){ //List isn't emply case
        findOb = list.find(item => {
            return item.value === value
        });
    }else{
        throw new Error('List is Empty');
    }

    if(findOb){ //Object founded case
        return findOb.id;
    }
}

export default getIdByValue