import DialogWindow from "../../layouts/dialogWindow";
import FormInput from "../UI/formInput";
import DefaultButton from "../UI/defaultButton";
import FormField from '../../layouts/slots/formField';
import FormFooter from '../../layouts/slots/formFooter';
import useEmployeeRequestModel from '../../hooks/hrmanager/useEmployeeRequestModel';
import React from "react";
import DefaultSlot from "../../layouts/slots/defaultSlot";

function EmployeeCommon({children, formVisible, employeeRegistEndPointName, userNameFieldDisplayOnly, houseRequestModel, editableEmployeeModel, hideForm, employeeRegistred, clearHouseRequestModel}) {
    const addressField = React.Children.toArray(children).find(child => child.type === DefaultSlot);

    const {registerEmployee, employeeRequestModel, setEmployeeRequestModel, updateNameModelValue, updateLastNameModelValue, updateSurNameModelValue, updateUserNameModelValue} = useEmployeeRequestModel(employeeRegistEndPointName, houseRequestModel, editableEmployeeModel, employeeRegistred, clearHouseRequestModel);

    function hideCurrentForm(){
        setEmployeeRequestModel({
            name: '',
            surName: '',
            lastName: '',
            userName: '',
        });
        clearHouseRequestModel();

        hideForm();
    }

    return (
        <DialogWindow
            visibleForm={formVisible}
            hideForm={hideCurrentForm}>
            <FormField>
                <FormInput 
                    fieldCaption="Фамилия"
                    inputValue={employeeRequestModel?.lastName}
                    updateInput={updateLastNameModelValue}>
                </FormInput>
                <FormInput 
                    fieldCaption="Имя"
                    inputValue={employeeRequestModel?.name}
                    updateInput={updateNameModelValue}>
                </FormInput>
                <FormInput 
                    fieldCaption="Отчество"
                    inputValue={employeeRequestModel?.surName}
                    updateInput={updateSurNameModelValue}>
                </FormInput>
                <FormInput 
                    fieldCaption="Имя пользователя"
                    inputValue={employeeRequestModel?.userName}
                    displayOnly={userNameFieldDisplayOnly}
                    updateInput={updateUserNameModelValue}>
                </FormInput>
                <>
                    {addressField}
                </>
            </FormField>
            <FormFooter>
                <DefaultButton
                    buttonClass="form"
                    buttonCaption="Сохранить"
                    buttonClick={registerEmployee}>
                </DefaultButton>
            </FormFooter>
        </DialogWindow>
    )
}

export default EmployeeCommon;