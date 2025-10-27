import React from "react";
import inputStyle from '../../styles/input.module.css';

function FormInput({fieldCaption, fieldType, updateInput, inputValue, displayOnly}){


    function updateFormInput(e){
        updateInput(e.target.value);
    }

    return (
        <div id={inputStyle.fieldWrapper}>
            <h3 className={inputStyle.header}>{ fieldCaption }</h3>
            <input type={fieldType} onChange={updateFormInput} value={inputValue} disabled={displayOnly} className={inputStyle.basic} />
        </div>
    )
}

export default FormInput