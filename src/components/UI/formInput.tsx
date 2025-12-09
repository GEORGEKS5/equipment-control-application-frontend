import { TEventTargetValue, TFormInput } from '../../helpers/types';
import inputStyle from '../../styles/input.module.css';

function FormInput({fieldCaption, fieldType, updateInput, inputValue, displayOnly}: TFormInput){

    function updateFormInput(e: TEventTargetValue){
        if(e.target !== null){
            updateInput('value' in e.target ? e.target.value : '');
        }else {
            throw new Error('Event target is null on Form input component');
        }
    }

    return (
        <div className='grid grid-rows-[0.5fr_0.8fr] md:grid-rows-[1fr_2fr] grid-cols-1'>
            <h3 className={inputStyle.header + ' text-xs'}>{ fieldCaption }</h3>
            <input type={fieldType} onChange={updateFormInput} value={inputValue} disabled={displayOnly} className={inputStyle.basic} />
        </div>
    )
}

export default FormInput