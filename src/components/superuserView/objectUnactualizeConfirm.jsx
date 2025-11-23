import ConfirmForm from '../confirmForm';
import getRequestPromise from '../../helpers/lib';
import { useContext } from 'react';
import UserContext from '../../context/user';

function ObjectUnactualizeConfirm({formVisible, objectIdentificator, hideForm, objectUnactualizeConfirmed}) {
    const {USER_STATE} = useContext(UserContext);
    
    function taskConfirmed(){
        const endPoint = 'UnactualizeObject';
        const servUrl = USER_STATE.getServerUrlAddress();
        const queryBody = { objectIdentificator };
        const confirmQueryPromise = getRequestPromise(servUrl, endPoint, queryBody);

        confirmQueryPromise.then(()=>{
            objectUnactualizeConfirmed();
        });
    }

    return (
        <ConfirmForm
            formVisible={formVisible}
            formCaption="Выбраный объект не актуален?"
            hideForm={hideForm}
            taskConfirmed={taskConfirmed}
            taskCanceled={hideForm}>
        </ConfirmForm>
    )
}

export default ObjectUnactualizeConfirm;