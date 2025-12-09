import { useEffect, useState } from "react";

function FormSelect({selectValue, targetModelName, valueKeyName, identificatorKeyName, extraRequestData, updateSelect, selectDefaultValue, selectData = []}){

    const [filteredSelectData, setFilteredSelectData] = useState([]);

    function updateCurrentSelect(event){
        let selectValue = event.target.selectedOptions[0].textContent;
        let selectID = event.target.value;

        let selectObject = getSelectObject(selectID, selectValue);

        updateSelect(selectObject);
    }

    function getPropName(targetModelNameParam, keyName){
        const keyNameContainTargetName = keyName.includes(targetModelNameParam);

        return keyNameContainTargetName ? keyName : targetModelNameParam + '' + camelizePropName(keyName)
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

    function getSelectActiveOptionValueByKeyName(sData, keyName){
        let selectDataLength = sData.length;

        if(selectDataLength){
            let selectedElement = sData.find(item => {
                return item.selected
            });

            let activeElement = selectedElement ? selectedElement[keyName] : selectValue ? sData[0][keyName] : selectDefaultValue;

            return activeElement;
        }

        return '';
    }

    function updateBindedSelect(sData){
        let activeElementKey = getSelectActiveOptionValueByKeyName(sData, identificatorKeyName);
        let activeElementValue = getSelectActiveOptionValueByKeyName(sData, valueKeyName);
        let selectedObject = getSelectObject(activeElementKey, activeElementValue);

        updateSelect(selectedObject);
    }

    function filterSelectDataByExtraValues(selectData, extraData){
        let selectDataLength = Object.keys(selectData).length;

        if(selectDataLength && objectPropsNotUndefined(extraData)){
            let s = selectData.filter(it => {
                for(let key in extraData){
                    if(it[key] != extraData[key]){
                        return false
                    }
                }
                return true
            })

            return s;
        }

        return [];
    }

    function installSelectData(){
        let extraDataSize = Object.keys(extraRequestData || {}).length;

        if(extraDataSize){
            let selectDataLength = selectData.length;

            if(selectDataLength){
                //setFilteredSelectData([...filterSelectDataByExtraValues(selectData, extraRequestData)]);
                setFilteredSelectData(v => {
                    const nv = [...filterSelectDataByExtraValues(selectData, extraRequestData)];
                    updateBindedSelect(nv);
                    return nv;
                })
            }
        }else{
            setFilteredSelectData([...selectData])
        }
    }

    useEffect(()=>{
        if(selectData.length){
            installSelectData();
        }
    },[selectData]);

    function objectPropsNotUndefined(obj){
        for(let s in obj){
            return Boolean(obj[s]);            
        }

        return false;
    }

    useEffect(( )=>{
        if(objectPropsNotUndefined(extraRequestData)){
            installSelectData();
        }
    },[extraRequestData]);

    return(
        <select name="" onChange={updateCurrentSelect} className="text-black text-xs rounded-sm min-w-[175px] border-0 px-[0.9em] py-[0.4em] md:px-[1.1em] md:py-[1em] bg-[#F3F3F3] md:mt-2">
            {
                    selectDefaultValue
                ?
                    <option value="" selected disabled> { selectDefaultValue } </option>
                :
                    <></>
            }

            {filteredSelectData?.map(dt => {
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