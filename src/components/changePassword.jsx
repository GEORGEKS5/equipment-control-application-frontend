import React from "react";
import DialogWindow from "../layouts/dialogWindow";
import FormField from "../layouts/slots/formField";
import FormFooter from "../layouts/slots/formFooter";
import FormInput from "./UI/formInput";
import DefaultButton from "./UI/defaultButton";

function ChangePassword({formVisible}){

    function hideForm(){
        console.log('hide Form')
    }

    function updateOriginPasswordModel(e) {
        console.log('updateOriginPasswordModel');
    }

    function updateNewPasswordModel(e) {
        console.log('updateNewPasswordModel');
    }
    
    function updateConfirmPasswordModel(e) {
        console.log('updateConfirmPasswordModel');
    }

    function sendPasswordChangeRequest() {
        console.log('sendPasswordChangeRequest');
    }

    return (
        <DialogWindow 
            visibleForm={formVisible}
            hideWindow={hideForm}>
            <FormField>
                <FormInput
                    fieldCaption="Старый пароль"
                    fieldType="password"
                    updateInput={updateOriginPasswordModel}>
                </FormInput>
                <FormInput
                    fieldCaption="Новый пароль"
                    fieldType="password"
                    updateInput={updateNewPasswordModel}>
                </FormInput>
                <FormInput
                    fieldCaption="Подтверждение нового пароля"
                    fieldType="password"
                    updateInput={updateConfirmPasswordModel}>
                </FormInput>
            </FormField>

            <FormFooter>
                <DefaultButton
                    buttonCaption="Сохранить пароль"
                    buttonClass="form"
                    buttonClick={sendPasswordChangeRequest}>
                </DefaultButton>
            </FormFooter>
        </DialogWindow>
    )
}

export default ChangePassword