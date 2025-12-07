import FormField from '../../layouts/slots/formField';
import DialogWindow from '../../layouts/dialogWindow';
import FormInput from '../../components/UI/formInput.tsx';
import useEquipmentFixationSupervisorRepository from '../../hooks/useEquipmentFixationSupervisorRepository';

function EquipmentFixationSupervisorDetail({formVisible, activeFixationSupervisor, hideForm}) {
    const {supervisorRepository} = useEquipmentFixationSupervisorRepository(formVisible, activeFixationSupervisor);

    return (
        <DialogWindow
            visibleForm={formVisible}
            hideForm={hideForm}>
            <FormField>
                <FormInput
                    inputValue={supervisorRepository.EmployeeLastName}
                    fieldCaption="Фамилия"
                    displayOnly={true}>
                </FormInput>
                <FormInput
                    inputValue={supervisorRepository.EmployeeName}
                    fieldCaption="Имя"
                    displayOnly={true}>
                </FormInput>
                <FormInput
                    inputValue={supervisorRepository.EmployeeSurName}
                    fieldCaption="Отчество"
                    displayOnly={true}>
                </FormInput>
                <FormInput
                    inputValue={supervisorRepository.AppointmentDate}
                    fieldCaption="Дата назначения"
                    displayOnly={true}>
                </FormInput>
            </FormField>
        </DialogWindow>
    )
}

export default EquipmentFixationSupervisorDetail;