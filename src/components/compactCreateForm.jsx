import getRequestPromise from '../helpers/lib';
import UserContext from '../context/user';
import { useContext, useEffect, useState } from 'react';
import SectionHeader from '../layouts/slots/sectionHeader';
import SectionData from '../layouts/slots/sectionData';
import SectionFooter from '../layouts/slots/sectionFooter';
import PropFormSelectBlock from './propertyForm/propFormSelectBlock';
import DefaultButton from '../components/UI/defaultButton';
import FormInput from '../components/UI/formInput';
import CompactForm from '../layouts/compactForm';

function CompactCreateForm({isBindedField, identificatorKeyName, valueKeyName, propInsert, hideCompactForm, extraPropInsert, compactFormVisible, targetModelName, targetPropModelName, extraRequestData, selectPropData = []}) {
    const {USER_STATE} = useContext(UserContext);

    const [fieldValue, setFieldValue] = useState('');

    function hideForm(){
        hideCompactForm();
    }

    function changeInputValue(value){
        setFieldValue(value);
    }

    function changeSelectValue(value){
        setFieldValue(value);
    }

    function sendExtraPropInsert(value){
        extraPropInsert(value);
    }

    function saveProp(){
        let servAdr = USER_STATE.getServerUrlAddress();
        let endpointName = 'Insert' + targetModelName;

        let insertObject = {
            [targetModelName+'Name']: fieldValue,
        }

        for(let k in extraRequestData){
            insertObject[k] = extraRequestData[k];
        }

        console.log(insertObject);

        let reqPromise = getRequestPromise(servAdr, endpointName, insertObject);

        reqPromise.then(result=>{
            if(result.ok){
                propInsert(fieldValue);
            }

            setFieldValue('');
        });
    }

    useEffect(() => {
        console.log(selectPropData);

        if(selectPropData?.length){
            let fieldName = 'selected';

            if(fieldName in selectPropData[0]){
                let sq = selectPropData.find(item => item[fieldName]);
                
                if(sq){
                    setFieldValue(sq[identificatorKeyName]);
                }else{
                    console.warn('Not found selected element on selecPropData change');
                }
            }else{
                console.log('Selected false')
                setFieldValue(selectPropData[0][identificatorKeyName]);
            }

            console.log(fieldValue);
        }
    }, [selectPropData])

    return (
        <CompactForm formVisible={compactFormVisible} hideChildForm={hideForm}>
            <SectionHeader>
                <h3>Добавление свойства</h3>
            </SectionHeader>

            <SectionData>
                {
                        isBindedField
                    ?
                        <PropFormSelectBlock 
                            selectBlockValue={fieldValue}
                            selectBlockData={selectPropData}
                            identificatorKeyName={identificatorKeyName}
                            valueKeyName={valueKeyName}
                            targetModelName={targetPropModelName}
                            fieldCaption="Значение"
                            updateSelect={changeSelectValue}
                            propSendInsert={extraPropInsert}
                        ></PropFormSelectBlock>
                    :
                        <FormInput
                            inputValue={fieldValue}
                            fieldCaption="Значение"
                            updateInput={changeInputValue}
                        >
                        </FormInput>
                }
            </SectionData>

            <SectionFooter>
                <DefaultButton
                    buttonCaption="Сохранить"
                    buttonClass="compactForm"
                    buttonClick={saveProp}
                >
                </DefaultButton>
            </SectionFooter>
        </CompactForm>
    )
}

export default CompactCreateForm;