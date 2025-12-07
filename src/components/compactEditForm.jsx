
import getRequestPromise from '../helpers/lib';
import DefaultButton from '../components/UI/defaultButton';
import FormInput from '../components/UI/formInput.tsx';
import CompactForm from '../layouts/compactForm';
import UserContext from '../context/user';
import { useContext, useEffect, useState } from 'react';
import SectionHeader from '../layouts/slots/sectionHeader';
import SectionData from '../layouts/slots/sectionData';
import SectionFooter from '../layouts/slots/sectionFooter';

function CompactEditForm({editObject, identificatorKeyName, valueKeyName, propUpdate, hideCompactForm, extraPropInsert, compactFormVisible, targetModelName, targetPropModelName, extraRequestData, selectPropData}) {
    const {USER_STATE} = useContext(UserContext);

    const [fieldValue, setFieldValue] = useState('');

    function hideForm(){
        hideCompactForm();
        setFieldValue('');
    }

    function changeInputValue(value){
        setFieldValue(value);
    }

    function changeSelectValue(value){
        setFieldValue(value);
    }

    function propInsert(value){
        extraPropInsert(value);
    }

    useEffect(() => {
        if(compactFormVisible){
            setFieldValue(editObject[valueKeyName]);
        }
    }, [compactFormVisible])

    function saveProp(){
        let servAdr = USER_STATE.getServerUrlAddress();
        let endpointName = 'Update' + targetModelName;

        let editedObject = {
            [targetModelName+'SourceValue']: editObject[identificatorKeyName],
            [targetModelName+'NewValue']: fieldValue,
        }

        for(let k in extraRequestData){
            editedObject[k] = extraRequestData[k];
        }

        console.log(editedObject);

        let reqPromise = getRequestPromise(servAdr, endpointName, editedObject);

        reqPromise.then(result=>{
            if(result.ok){
                propUpdate(fieldValue)
            }
        });
    }

    useEffect(() => {
        //console.log(selectPropData);
        
        if(selectPropData?.length){
            let fieldName = 'selected';

            if(fieldName in selectPropData[0]){
                let sq = selectPropData.find(item => item[fieldName]);
                
                if(sq){
                    fieldValue = sq[identificatorKeyName];
                }else{
                    console.warn('Not found selected element on selecPropData change');
                }
            }else{
                console.log('Selected false')
                fieldValue = selectPropData[0][identificatorKeyName];
            }

            console.log(fieldValue);
        }
    }, [selectPropData])

    return (
        <CompactForm formVisible={compactFormVisible} hideChildForm={hideForm}>
            <SectionHeader>
                <h3>Изменение свойства</h3>
            </SectionHeader>

            <SectionData>
                <FormInput
                    inputValue={fieldValue}
                    fieldCaption="Значение"
                    updateInput={changeInputValue}
                >
                </FormInput>
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

export default CompactEditForm;