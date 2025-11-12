import DefaultButton from "./defaultButton";

function FormButtonBlock({fieldCaption, buttonCaption, buttonClick}) {
    return (
        <div className="grid grid-cols-[1fr]">
            <div className="grid grid-rows-[1fr_1fr]">
                <h3 className="text-left">{ fieldCaption }</h3>
                <DefaultButton
                    buttonCaption={buttonCaption}
                    buttonClick={buttonClick}>
                </DefaultButton>
            </div>
        </div>
    )
}

export default FormButtonBlock;