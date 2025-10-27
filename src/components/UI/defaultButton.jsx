import React from "react";
import btnStyle from '../../styles/button.module.css'

function DefaultButton({buttonValue, buttonClick, buttonClass, buttonCaption}){
    const className = btnStyle.defaultButton + ' ' + (btnStyle[buttonClass] ?? '');

    return(
        <button value={buttonValue} onClick={buttonClick}  className={className}>
            <span>{ buttonCaption }</span> 
        </button>
    )
}

export default DefaultButton;