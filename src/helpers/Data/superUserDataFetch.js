import getRequestPromise from "../lib";
/**
 *  * Выполняет запрос к серверу данные для отображения данных на главной страницы Суперпользователя
 * @param {*} apiUrlAddress URL адрес сервера
 * @returns Промис с результатами запроса по объектам, актуальным начальников объектов и последным закрепленым позициям
 */
async function getSuperUserData(apiUrlAddress){
    let resultObject = {};

    let resultPromise = new Promise((res, rej) => {
        let actObjPromise = getRequestPromise(apiUrlAddress, 'GetObjectList', {});

        actObjPromise.then(objPromResult=>{
            objPromResult.json().then(jsonObjectRes=>{
                resultObject.object = jsonObjectRes;
    
                let actSuperPromise = getRequestPromise(apiUrlAddress, 'GetActualObjectSupervisors', {});
    
                actSuperPromise.then(superPromResult=>{
                    superPromResult.json().then(jsonSuperRes=>{
                        resultObject.supervisors = jsonSuperRes;
    
                        let equipPromise =  getRequestPromise(apiUrlAddress, 'EquipmentListLastFixation', {});
    
                        equipPromise.then(equipPromResult=>{
                            equipPromResult.json().then(jsonEquipRes=>{
                                resultObject.equipments = jsonEquipRes;
                                
                                res(resultObject);
                            })
                        });
                    });
                })
            });
        })
    })

    return await resultPromise;
}

export default getSuperUserData