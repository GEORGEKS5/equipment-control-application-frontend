import DialogWindow from '../../layouts/dialogWindow';
import FormField from '../../layouts/slots/formField';
import FormFooter from '../../layouts/slots/formFooter';
import FormInput from '../UI/formInput.tsx';
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
        <DialogWindow
            visibleForm={formVisible}
            hideForm={hideForm}>
            <FormField>
                <FormInput
                    fieldCaption="Название объекта"
                    updateInput={setObjectName}>
                </FormInput>
            </FormField>
            <FormFooter>
                <DefaultButton
                    buttonCaption="Save"
                    buttonClass="form"
                    buttonClick={sendCreationRequest}>
                </DefaultButton>
            </FormFooter>
        </DialogWindow>
    )
}

export default ObjectCreate;