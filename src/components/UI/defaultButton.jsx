import Icon from '@mdi/react';
import btnStyle from '../../styles/button.module.css'

function DefaultButton({buttonValue, buttonClick, buttonClass, buttonCaption, buttonIconPath}){
    const className = btnStyle.defaultButton + ' ' + (btnStyle[buttonClass] ?? '');

    return(
        <button value={buttonValue} onClick={buttonClick}  className={className}>
            {
                    buttonIconPath
                ?
                    <Icon path={buttonIconPath} size={0.6} style={{transform: 'none'}}></Icon>
                :
                    <span>{ buttonCaption }</span>
            }
        </button>
    )
}

export default DefaultButton;