import getRequestPromise from "../lib";
/**
 *  * Выполняет запрос к серверу данные для отображения данных на главной страницы Ответсвеного сотрудника
 * @param {*} serverUrlAddress URL адрес сервера
 * @param {*} bodyObject Объект запроса
 * @returns Промис с результатами запроса по закрепленым и готовым для закрепления позициям
 */
async function getSupervisorPageData(serverUrlAddress, bodyObject){
    let resultPromise = new Promise((res, rej)=>{
        let resultArray = {};

        let supervisorFixationPromise = getRequestPromise(serverUrlAddress, 'ObjectSupervisorFixations', bodyObject)

        supervisorFixationPromise.then(resultPromise=>{
            resultPromise.json().then(jsonResult=>{
                resultArray['superviserFixations'] = jsonResult;

                let fixEquipPromise = getRequestPromise(serverUrlAddress, 'FixationReadyEquipment', {});

                fixEquipPromise.then(fixPromResult=>{
                    fixPromResult.json().then(fixJsonResult=>{
                        resultArray['readyFixations'] = fixJsonResult;
                        console.log(fixJsonResult);
                        res(resultArray);
                    });
                })
            });
        });
    });

    return await resultPromise;
}

export default getSupervisorPageData