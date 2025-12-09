import { hasCookie } from "./cookieManager";
import getRequestPromise from "./lib";

type TUserToken = {
    EmpName: string, 
    EmpLastName: string, 
    AppointmentDate: string, 
    RoleName: string, 
    UserName: string,
    message?: string
}

export function checkUserToken(tokenData: TUserToken | undefined): boolean {
    if(hasCookie('userName') || hasCookie('userRole')){
        if(tokenData !== undefined){
            return tokenData && !('message' in tokenData)
        }else{
            console.error('User token is undefined');
        }
    }

    return false;
}

export async function getUserToken(ServerUrlAddress: string): Promise<TUserToken | undefined> {
    if(hasCookie('userName') || hasCookie('userRole')){
        try {
            let getUserRequest = await getRequestPromise(ServerUrlAddress, 'GetUserDataByToken');
            let userDataJson: TUserToken = await getUserRequest.json();

            return userDataJson;
        }catch(e){
            throw new Error(typeof e === 'string' ? e : 'Error on getUserToken');
        }
    }
}