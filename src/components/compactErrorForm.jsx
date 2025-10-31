import formStyle from '../styles/form.module.css';

function CompactErrorForm({compactFormDescription, compactFormVisible, closeButtonPress}) {

    function closeButtonPress(){
        closeButtonPress();
    }
   
    return (
            compactFormVisible
        ?
            <div className={formStyle.error__formWrapper} onClick={closeButtonPress}>
                <div className={formStyle.error__formContent}>
                    <div className={formStyle.error__fieldsWrapper} onClick={e => {e.stopPropagation()}}>
                        <h3>Ошибка</h3>
                        <div className={formStyle.error__activeWrapper}>
                            <p>{ compactFormDescription }</p>
                            <button onClick={closeButtonPress}>Понятно</button>
                        </div>
                    </div>
                </div>    
            </div>
        :
        <></>
    )
}

export default CompactErrorForm;