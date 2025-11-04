import { useEffect, useState } from "react";

function PropertyFormSelect({selectValue, selectData, selectDefaultValue, identificatorKeyName, valueKeyName, targetModelName, extraRequestData, updateSelect}) {
    const [filteredSelectData, setFilteredSelectData] = useState([]);

    function camelizePropName(name){
        let nameArray = name.split('');
        nameArray[0] = nameArray[0].toUpperCase();

        return nameArray.join('');
    }

    function getSelectObject(selectID, selectVal = ''){
        let camelizeValueName = camelizePropName(valueKeyName);
        let camelizeIdentificatorName = camelizePropName(identificatorKeyName);

        let modelValueName = targetModelName + '' + camelizeValueName;
        let modelIdentificatorName = targetModelName + '' + camelizeIdentificatorName;

        let selectObject = {};
        selectObject[modelIdentificatorName] = selectID;
        selectObject[modelValueName] = selectVal || selectID;

        return selectObject;
    }

    function selectUpdated(event){
        let selectVal = event.target.selectedOptions[0].textContent;
        let selectID = event.target.value;

        let selectObject = getSelectObject(selectID, selectVal);

        updateSelect(selectObject);
    }

    function getSelectActiveOptionValueByKeyName(selectData, keyName){
        let selectDataLength = selectData.length;

        if(selectDataLength){
            let selectedElement = selectData.find(item => {
                return item.selected
            });

            let activeElement = selectedElement ? selectedElement[keyName] : selectData.at(-1)[keyName];

            return activeElement;
        }

        return '';
    }

    function updateBindedSelect(selectData){
        let activeElementValue = getSelectActiveOptionValueByKeyName(selectData, identificatorKeyName);
        let selectedObject = getSelectObject(activeElementValue);

        updateSelect(selectedObject);
    }

    function filterSelectDataByExtraValues(selectData, extraData){
        return selectData.filter(it => {
            for(let key in extraData){
                if(it[key] != extraData[key]){
                    return false
                }
            }
            return true
        })
    }

    function installSelectData(){
        let extraDataSize = Object.keys(extraRequestData).length;

        if(extraDataSize){
            setFilteredSelectData(filterSelectDataByExtraValues(selectData, extraRequestData));
            updateBindedSelect(filteredSelectData);
        }else{
            setFilteredSelectData(selectData);
        }
    }

    useEffect(()=>{
        console.log('Select Data Changed ' + targetModelName );
        console.log(selectData);
        installSelectData();
    }, [selectData])
    
    return (
        <select name="" onChange={selectUpdated} className="text-[#000000] bg-[#F3F3F3] text-[11px] rounded-sm px-5 py-2">
            {selectDefaultValue ? <option value="" selected disabled> { selectDefaultValue } </option> : <></>}
            {filteredSelectData.map(dt =>{
                            <option 
                key={dt[identificatorKeyName]} 
                value={dt[identificatorKeyName]} 
                selected={dt.selected}>{ dt[valueKeyName] }</option>
            })}
        </select>
    )
}

export default PropertyFormSelect;