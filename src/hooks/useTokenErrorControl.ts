import { useContext } from "react";
import { checkUserToken, getUserToken } from "../helpers/userToken";
import UserContext from "../context/user";
import { TUserContext } from "../helpers/types";
import { BasicForm } from "../helpers/classes";
import { IMouseEvent } from "../helpers/interfaces";

export default function(showErrorFormWithDescription: (errorDescription: string) => void){
    const {USER_STATE} = useContext<{USER_STATE: TUserContext}>(UserContext);
    const serverUrlAddress = USER_STATE.getServerUrlAddress(); 

    type TFunc = () => void;

    function showFormWithAuthCheck(showTargetModelFormMethod: () => void): void;
    function showFormWithAuthCheck(formModel: BasicForm,  eventObject?: IMouseEvent, dataModel?: unknown[]): void;
    function showFormWithAuthCheck(formOrMethod: TFunc | BasicForm, eventObject?: IMouseEvent, dataModel?: unknown[]): void {
        const userTokenPromise = getUserToken(serverUrlAddress);

        userTokenPromise.then(userToken => {
            const isTokenActual = checkUserToken(userToken);

            if(isTokenActual){
                if(formOrMethod instanceof BasicForm){
                    formOrMethod.show(eventObject, dataModel)
                }else{
                    formOrMethod();
                }
            }else{
                showErrorFormWithDescription('Token Actual ' + isTokenActual);
            }
        })
    }

    return {
        showFormWithAuthCheck,
    }
}