import CompactForm from '../../layouts/compactForm';
import DefaultButton from '../UI/defaultButton';
import FormInput from '../UI/formInput.tsx';
import getRequestPromise from '../../helpers/lib';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user';
import SectionHeader from '../../layouts/slots/sectionHeader';
import SectionData from '../../layouts/slots/sectionData';
import SectionFooter from '../../layouts/slots/sectionFooter';

function CompactCreatePropForm({compactFormVisible, targetModelName, targetPropModelName, extraRequestData, selectPropData, identificatorKeyName, valueKeyName, hideCompactForm, extraPropInsert, propInsert}) {
    const [fieldValue, setFieldValue] = useState('');
    const {USER_STATE} = useContext(UserContext);

    function changeInputValue(value){
        setFieldValue(value);
    }

    function changeSelectValue(value){
        setFieldValue(value);
    }

    function sendPropInsert(value){
        //extraPropInsert(value);
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

        let reqPromise = getRequestPromise(servAdr, endpointName, insertObject);

        reqPromise.then(result=>{
            if(result.ok){
                propInsert(fieldValue);
            }

            setFieldValue('');
        });
    }

    useEffect(()=>{
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
        <CompactForm
            formVisible={compactFormVisible}
            hideChildForm={hideCompactForm}
            >
            <SectionHeader>
                <h3>Добавление свойства</h3>
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
                    buttonClass="form"
                    buttonClick={saveProp}
                ></DefaultButton>
            </SectionFooter>
        </CompactForm>
    )
}

export default CompactCreatePropForm;