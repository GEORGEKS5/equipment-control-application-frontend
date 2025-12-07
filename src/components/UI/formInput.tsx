import inputStyle from '../../styles/input.module.css';

type TFormInput = {
    fieldCaption: string,
    fieldType: string,
    inputValue: string,
    displayOnly: boolean,
    updateInput(e: string): void,
}

type TEventTargetValue = {
    target: {
        value:string
    }
} | Event;

function FormInput({fieldCaption, fieldType, updateInput, inputValue, displayOnly}: TFormInput){

    function updateFormInput(e: TEventTargetValue){
        if(e.target !== null){
            updateInput('value' in e.target ? e.target.value : '');
        }else {
            throw new Error('Event target is null on Form input component');
        }
    }

    return (
        <div id={inputStyle.fieldWrapper}>
            <h3 className={inputStyle.header}>{ fieldCaption }</h3>
            <input type={fieldType} onChange={updateFormInput} value={inputValue} disabled={displayOnly} className={inputStyle.basic} />
        </div>
    )
}

export default FormInput