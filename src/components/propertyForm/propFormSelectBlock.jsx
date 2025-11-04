import CompactEditForm from '../compactEditForm';
import CompactCreateForm from '../propertyForm/compactCreatePropForm';
import CompactErrorForm from '../compactErrorForm';
import FormSelect from '../UI/propertyFormSelect';
import DefaultButton from '../UI/defaultButton';
import { useMemo, useState } from 'react';

function PropFormSelectBlock({selectBlockValue, selectBlockData, selectPropData, identificatorKeyName, valueKeyName, selectPlaceholder, targetModelName, extraRequestData, fieldCaption, actionButtonCaption, updateSelect, propSendUpdate, propSendInsert}) {
    const [errorFormVisible, setErrorFormVisible] = useState(false);
    const [errorFormMessage, setErrorFormMessage] = useState('');
    const [visible, setVisible] = useState({
        createForm: false,
        editForm: false,
    });

    function updateBlockData(val){
        let identifArray = identificatorKeyName.split('');
        identifArray[0] = identifArray[0].toUpperCase();
        let camelizedKeyName = identifArray.join('');
        let keyName = targetModelName + camelizedKeyName;
        let keyValue = val[keyName];

        updateSelect(keyValue);
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
        propSendUpdate(val);
        setVisible({...visible, editForm: false});
    }

    function propInsert(val){
        propSendInsert(val);
        setVisible({...visible, createForm: false});
    }

    const selectedElement = useMemo(() => {
        let selDataKeySize = Object.keys(selectBlockData).length;
        if(selDataKeySize){
            let elt = this.selectBlockData.find(item => {
                return item[valueKeyName] === selectBlockValue ? item : null
            });

            return elt;
        }

        return {};
    }, [selectBlockData, selectBlockValue])
   
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
                extraRequestData={extraRequestData}
                selectPropData={selectPropData}
                identificatorKeyName={identificatorKeyName}
                hideCompactForm={hideCreateForm}
                propInsert={propInsert}
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

            <div className="selectWrapper grid grid-cols-[0.5fr_0.8fr] justify-evenly">
                <div id="fieldWrapper" className="flex flex-col justify-between">
                    <h3 className="defaultCaption text-xs">{ fieldCaption }</h3>
                    <FormSelect selectDefaultValue={selectPlaceholder} 
                                selectValue={selectBlockValue}
                                selectData={selectBlockData}
                                identificatorKeyName={identificatorKeyName}
                                valueKeyName={valueKeyName}
                                targetModelName={targetModelName}
                                extraRequestData={extraRequestData}
                                updateSelect={updateBlockData}>
                    </FormSelect>
                </div>
                <div id="fieldWrapper" className="flex flex-col justify-center">
                    <h3 className="actionCaption text-xs">{ actionButtonCaption }</h3>
                    <div className="buttonBlock flex flex-rows justify-evenly">
                        <DefaultButton buttonClass="defaultSM" buttonCaption="Нов" buttonClick={openCreateForm}></DefaultButton>
                        <DefaultButton buttonClass="defaultSM" buttonCaption="Ред" buttonClick={openEditForm}></DefaultButton>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PropFormSelectBlock;