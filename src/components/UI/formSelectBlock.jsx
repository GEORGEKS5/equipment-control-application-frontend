import {mdiPencil, mdiPlus} from '@mdi/js'
import FormSelectBlockBasic from './formSelectBlockBasic';
import CompactCreateForm from '../compactCreateForm';
import CompactEditForm from "../compactEditForm";
import CompactErrorForm from '../compactErrorForm';
import DefaultButton from './defaultButton';
import getRequestPromise from '../../helpers/lib';
import markSelectedProperty from '../../helpers/markData';
import { useContext, useMemo, useState } from 'react';
import UserContext from '../../context/user';
import DefaultSlot from '../../layouts/slots/defaultSlot';

function FormSelectBlock({selectBlockValue, selectBlockData, selectPropDataUrlAddress, identificatorKeyName, valueKeyName, selectPlaceholder, targetModelName, targetPropModelName, extraRequestData, fieldCaption, updateSelect, sendPropInsert, sendExtraPropInsert, sendPropUpdate}) {
    const {USER_STATE} = useContext(UserContext);
    
    const [selectPropData, setSelectPropData] = useState([]);
    const [errorFormVisible, setErrorFormVisible] = useState(false);
    const [errorFormMessage, setErrorFormMessage] = useState('');
    const [visible, setVisible] = useState({
        createForm: false,
        editForm: false,
    });

    function updateBlockData(val){
        updateSelect(val);
    }

    function openEditForm(){
        if(selectBlockValue){
            setVisible({createForm: false, editForm: true});
        }else{
            setErrorFormVisible(true);
            setErrorFormMessage('Не выбрано свойство для редактирования');
        }
    }

    function openCreateForm(){
        installSelectPropData();
        setVisible({createForm: true, editForm: false});
    }

    function closeErrorForm(){
        setErrorFormVisible(false);
    }

    function hideCreateForm(){
        setVisible({...visible, createForm: false});
    }

    function hideEditForm(){
        setVisible({...visible, editForm: false});
    }

    function propUpdate(val){
        hideEditForm();
        sendPropUpdate(val)
    }

    function propInsert(val){
        setVisible({...visible, createForm: false});
        sendPropInsert(val);
    }

    function extraPropInsert(val){
        installSelectPropData(val);
        sendExtraPropInsert(val);
    }

    function installSelectPropData(activeValue){
        console.log(activeValue);

        if(isBindedField){
            const servUrlAdr = USER_STATE.getServerUrlAddress();
            const reqPromise = getRequestPromise(servUrlAdr, selectPropDataUrlAddress, {});

            reqPromise.then(async (res)=>{
                const jsonResp = await res.json();

                if(activeValue){
                    markSelectedProperty(jsonResp, activeValue, valueKeyName)
                }

                console.log(jsonResp);
                setSelectPropData([...jsonResp]);
            });
        }
    }

    const isBindedField = useMemo(()=>{
        return Boolean(selectPropDataUrlAddress);
    }, [selectPropDataUrlAddress]);
    
    const selectedElement = useMemo(() => {
        let selDataKeySize = Object.keys(selectBlockData).length;
        if(selDataKeySize){
            let elt = selectBlockData.find(item => {
                return item[valueKeyName] === selectBlockValue ? item : null
            });

            return elt;
        }

        return {selectBlockData, selectBlockValue};
    }, [])

    return (
        <>
            <CompactErrorForm
                compactFormVisible={errorFormVisible}
                compactFormDescription={errorFormMessage}    
                closeButtonPress={closeErrorForm}
            ></CompactErrorForm>
            <CompactCreateForm 
                compactFormVisible={visible.createForm} 
                targetModelName={targetModelName}
                targetPropModelName={targetPropModelName}
                extraRequestData={extraRequestData}
                selectPropData={selectPropData}
                identificatorKeyName={identificatorKeyName}
                valueKeyName={valueKeyName}
                isBindedField={isBindedField}
                hideCompactForm={hideCreateForm}
                propInsert={propInsert}
                extraPropInsert={extraPropInsert}
            ></CompactCreateForm>
            <CompactEditForm 
                compactFormVisible={visible.editForm}
                targetModelName={targetModelName}
                editObject={selectedElement}
                extraRequestData={extraRequestData}
                identificatorKeyName={identificatorKeyName}
                valueKeyName={valueKeyName} 
                hideCompactForm={hideEditForm}
                propUpdate={propUpdate}
            ></CompactEditForm>

            <FormSelectBlockBasic
                selectPlaceholder={selectPlaceholder} 
                selectBlockValue={selectBlockValue}
                selectBlockData={selectBlockData}
                identificatorKeyName={identificatorKeyName}
                valueKeyName={valueKeyName}
                targetModelName={targetModelName}
                targetPropModelName={targetPropModelName}
                extraRequestData={extraRequestData}
                fieldCaption={fieldCaption}
                updateSelect={updateBlockData}>
                <DefaultSlot>
                    <DefaultButton buttonIconPath={mdiPlus} buttonClick={openCreateForm}></DefaultButton>
                    <DefaultButton buttonIconPath={mdiPencil} buttonClick={openEditForm}></DefaultButton>
                </DefaultSlot>
            </FormSelectBlockBasic>
        </>
    )
}

export default FormSelectBlock;
