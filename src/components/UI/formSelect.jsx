import React, { useState } from "react";

function FormSelect({targetModelName, valueKeyName, identificatorKeyName, setSelectValue, selectDefaultValue, selectData = []}){

    const filteredSelectData = useState('');

    function updateSelect(event){
        let selectValue = event.target.selectedOptions[0].textContent;
        let selectID = event.target.value;

        let selectObject = getSelectObject(selectID, selectValue);

        console.log(selectObject);
        //setSelectValue(selectObject);
    }

    function getPropName(targetModelName, keyName){
        const keyNameContainTargetName = keyName.includes(targetModelName);

        return keyNameContainTargetName ? keyName : targetModelName + '' + camelizePropName(keyName)
    }

    function getSelectObject(selectID, selectValue = ''){
        let modelValueName = getPropName(targetModelName, valueKeyName);
        let modelIdentificatorName = getPropName(targetModelName, identificatorKeyName);

        let selectObject = {};
        selectObject[modelIdentificatorName] = selectID;
        selectObject[modelValueName] = selectValue ? selectValue : selectID;

        return selectObject;
    }

    function camelizePropName(name){
        let nameArray = name.split('');
        nameArray[0] = nameArray[0].toUpperCase();

        return nameArray.join('');
    }

    return(
        <select name="" onChange={updateSelect}>

            {selectData.map(dt => {
                console.log(dt);
                return (<option 
                    value={dt[identificatorKeyName]}
                    key={dt[identificatorKeyName]}
                    selected={dt.selected}>    
                    {dt[valueKeyName]}
                </option>)
            })} 
        </select>
    )
}

export default FormSelect