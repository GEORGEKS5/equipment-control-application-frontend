import Icon from '@mdi/react';
import btnStyle from '../../styles/button.module.css';

type TDefaultButtonProps = {
    buttonValue?: string,
    buttonClass?: 'primary' | 'primaryBrown' | 'action' | 'actionSM' | 'defaultSM' | 'default' | 'form' | 'compactForm' | 'formUnactive' | 'tableAction' | 'tableHeader' | 'sectionFooter',
    buttonCaption: string,
    buttonIconPath?: string,
    buttonClick(): void,
}

function DefaultButton({buttonValue, buttonClick, buttonClass = 'default', buttonCaption, buttonIconPath}: TDefaultButtonProps){
    const tailwindClassName = 'bg-[#D0D8D9] p-[0.4em] md:p-[1em] md:mt-2 text-xs cursor-pointer';
    const className = tailwindClassName + ' ' + btnStyle.baseButton + ' ' + btnStyle[buttonClass];

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