import React, { useMemo, useState } from "react";
import FormSelect from './formSelect';
import DefaultSlot from '../../layouts/slots/defaultSlot';

function FormSelectBlockBasic({children, selectBlockValue, selectBlockData, selectPropDataUrlAddress, identificatorKeyName, valueKeyName, selectPlaceholder, targetModelName, targetPropModelName, extraRequestData, fieldCaption, actionButtonCaption, updateSelect}) {
    const formButtonBlock = React.Children.toArray(children).find(child => child.type === DefaultSlot);
    
    const [selectPropData, setSelectPropData] = useState({});

    const isBindedField = useMemo(() => {
        return Boolean(selectPropDataUrlAddress);
    }, [selectPropDataUrlAddress]);

    function updateBlockData(val){
        updateSelect(val);
    }

    return (
        <div className="selectWrapper grid grid grid-cols-[auto_2fr] md:grid-cols-[1fr_0.5fr]">
            <div id="fieldWrapper" className="grid grid-rows-[0.5fr_0.8fr] md:grid-rows-[1fr_2fr] grid-cols-1">
                <h3 className="defaultCaption text-xs text-left">{ fieldCaption }</h3>
                <FormSelect 
                    selectDefaultValue= {selectPlaceholder} 
                    selectValue={selectBlockValue}
                    selectData={selectBlockData}
                    identificatorKeyName={identificatorKeyName}
                    valueKeyName={valueKeyName}
                    targetModelName={targetModelName}
                    extraRequestData={extraRequestData}
                    updateSelect={updateBlockData}>
                </FormSelect>
            </div>
            <div id="fieldWrapper" className="grid grid-rows-[0.15fr_0.2fr] md:grid-rows-[1fr_2fr]">
                <h3 className="actionCaption text-xs border-b-2 border-[#8C4830]">{ actionButtonCaption }</h3>
                <div className="buttonBlock flex flex-row justify-evenly">
                    {formButtonBlock}
                </div>
            </div>
        </div>
    )
}

export default FormSelectBlockBasic;