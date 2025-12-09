/** 
 * @param {string} ServerUrlAddress URL адрес сервера
 * @returns {Promise<boolean | undefined>} Промис с результатами проверки актуальности токена
*/

import { hasCookie } from "./cookieManager";
import getRequestPromise from "./lib";

async function checkUserToken(ServerUrlAddress: string): Promise<boolean | undefined> {
    if(hasCookie('userName') || hasCookie('userRole')){
        try {
            let getUserRequest = await getRequestPromise(ServerUrlAddress, 'GetUserDataByToken');
            let userDataJson = await getUserRequest.json();

            console.log(userDataJson);
            console.log(!('message' in userDataJson));

            return userDataJson && !('message' in userDataJson)
        }catch(e){
            throw new Error(typeof e === 'string' ? e : 'Error on check user permission');
        }
    }
}

export default checkUserToken;