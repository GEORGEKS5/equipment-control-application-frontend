import DefaultButton from "./UI/defaultButton";

type TErrorFormProps = {
    formVisible: boolean,
    errorDescription: string,
    errorExplonation?: string,
    actionButtonCaption: string,
    actionButtonClick(): void,
    closeButtonClick(): void,
}

function ErrorForm({formVisible, errorDescription,errorExplonation , actionButtonCaption , actionButtonClick, closeButtonClick}:TErrorFormProps) {
    return (
            formVisible
        ?
            <div className="fixed flex flex-col justify-center items-center inset-x-0 inset-y-0 bg-[#ffffffd9] z-9999999" onClick={closeButtonClick}>
                <div className="error__formContent flex flex-col justify-center items-center min-h-[350px] bg-[#fff] w-[28%] p-10 rounded-sm shadow-xl">
                    <div className="error__fieldsWrapper flex flex-col justify-between p-[2em]  t-0 b-0 min-w-[250px] min-h-[230px] w-[25%] " onClick={ e => {e.stopPropagation()}}>
                        <h3 className="text-2xl text-amber-500">Ошибка</h3>
                        <div className="error__activeWrapper flex flex-col justify-evenly min-h-[100%]">
                            <p className="text-center">{ errorDescription } (<span className="text-gray-400">{errorExplonation ?? 'Объяснение'}</span>)</p>
                            <DefaultButton
                                buttonCaption={actionButtonCaption}
                                buttonClick={actionButtonClick}
                                buttonClass="action">
                            </DefaultButton>
                        </div>
                    </div>
                </div>    
            </div>
        :
            <></>
    )    
}

export default ErrorForm;
