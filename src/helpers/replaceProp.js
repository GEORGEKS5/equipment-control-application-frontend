/**
 * Меняет исходный объект. Заменяет старое свойство на новое с указаным значением
 * @param {Object} obj Исходный массив
 * @param {String} oldPropName Имя старого свойства
 * @param {String} newPropName Имя нового свойства
 * @param {Any} newPropValue Значение нового свойства
 */
function replaceProp(obj, oldPropName, newPropName, newPropValue){
    delete obj[oldPropName];
    obj[newPropName] = newPropValue;
}

export default replaceProp;