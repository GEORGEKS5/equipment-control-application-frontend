import DefaultButton from "./defaultButton";

function FormButtonBlock({fieldCaption, buttonCaption, buttonClick}) {
    return (
        <div className="selectWrapper">
            <div className="fieldWrapper">
                <h3 className="defaultCaption">{ fieldCaption }</h3>
                <DefaultButton
                    buttonCaption={buttonCaption}
                    buttonClick={buttonClick}>
                </DefaultButton>
            </div>
        </div>
    )
}

export default FormButtonBlock;