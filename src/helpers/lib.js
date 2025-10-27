/**
 * Делает запрос к серверу с учетом параметров
 * @param {string} serverUrlAddress Url адрес целевого для запроса сервера
 * @param {string} endPoint Имя конечной точки маршрута
 * @param {object} bodyObject Объект параметрами для тела запроса
 * @returns Промис с результатами запроса
 */
async function getRequestPromise(serverUrlAddress, endPoint, bodyObject = {}) {
    if(!serverUrlAddress){
        throw new Error('Server address is empty');
    }

    if(!endPoint){
        throw new Error('Endpoint name is empty');
    }

    let requestAddress = serverUrlAddress + `/${endPoint}`;
    
    return await fetch(requestAddress, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(bodyObject),
    });
}

export default getRequestPromise;