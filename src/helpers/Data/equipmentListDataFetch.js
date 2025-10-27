import getRequestPromise from "../lib";
/**
 * Выполняет запрос к серверу данные для выпадающих списков Произодитель, Категория, Модель в формах Оборудования
 * @param {String} serverUrlAddress URL адрес сервера
 * @param {Object} body Тело запроса
 * @returns Промис с результатами запроса
 */
async function getEquipmentListData(serverUrlAddress, body){
    let prom = new Promise((resolve, reject)=>{
        let result = {};

        let brandPromise = getRequestPromise(serverUrlAddress, 'GetBrandList', body);

        brandPromise.then(brandPromResult=>{
            brandPromResult.json().then(jsonBrandResult=>{
                result['BrandList'] = jsonBrandResult;

                let categoryPromise = getRequestPromise(serverUrlAddress, 'GetCategoryList', body);

                categoryPromise.then(catPromResult=>{
                    catPromResult.json().then(jsonCatResult=>{
                        result['CategoryList'] = jsonCatResult;

                        let modelPromise = getRequestPromise(serverUrlAddress, 'GetSerialModelList', body);

                        modelPromise.then(modelPromResult=>{
                            modelPromResult.json().then(jsonModResult=>{
                                result['SerialModelList'] = jsonModResult;

                                resolve(result);
                            })
                        })
                    })
                })
            })
        })
    })

    return await prom;
}

export default getEquipmentListData