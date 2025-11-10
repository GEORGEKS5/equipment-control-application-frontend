/**
 * Добавляет в исходный массив поле по которому можно отметить текущее значение
 * @param {Array} selectArray Массив на основе которого строится выпадающий список
 * @param {String} value Выбраное значение
 * @param {String} key Имя ключевое поле в массиве
 */
function markSelectedProperty(selectArray, value, key){
    if(Array.isArray(selectArray)){
        selectArray.map(item => {
            item.selected = ''+item[key] === ''+value ? true : false
            //console.log(item[key] + ' ' + value + ' ' + item.selected +' '+ typeof item[key] + ' ' + typeof value);
        })
    }else{
        throw new Error('Select Array is undefined');
    }
}

export default markSelectedProperty