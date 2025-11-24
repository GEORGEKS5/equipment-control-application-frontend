import DialogWindow from '../../layouts/dialogWindow';
import FormInput from '../UI/formInput';
import DefaultButton from '../UI/defaultButton';
import getRequestPromise from '../../helpers/lib';
import { useContext, useState } from 'react';
import UserContext from '../../context/user';

function ObjectCreate({formVisible, constructiveObjectCreated, hideForm}) {
    const [constructiveObjectName, setConstructiveObjectName] = useState('');
    const {USER_STATE} = useContext(UserContext);

    function setObjectName(value){
        setConstructiveObjectName(value);
    }

    function sendCreationRequest(){
        const servUrlAdr = USER_STATE.getServerUrlAddress();
        const endPointName = 'InsertConstructiveObject';

        const requestPromise = getRequestPromise(servUrlAdr, endPointName, { constructiveObjectName });

        requestPromise.then(resp=>{
            //setConstructiveObjectName('');
            
            if(resp.ok){
                constructiveObjectCreated();
            }else{   
                hideForm();
            }
        })
    }

    return (
        <></>
    )
}

export default ObjectCreate;