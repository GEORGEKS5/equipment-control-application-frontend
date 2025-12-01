import { BasicForm, EmployeeIdentifierOnlyModelForm, EmployeeModelForm, FilterForm, FilterFormVisibilityController } from "../../helpers/classes"

export default function(){
    const employeeCreateForm = new BasicForm();
    const employeeEditForm = new EmployeeModelForm({UserName: ''});
    const appointmentDirectorConfirmForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const appointmentHrManagerConfirmForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const unActualizeHrManagerConfirmForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const _filterEmployeeForm = new FilterForm('filterEmployee');
    const _filterDirectorForm = new FilterForm('filterDirector');
    const _filterHrManagerForm = new FilterForm('filterHrManager');

    const filterEmployeeFormController = new FilterFormVisibilityController(_filterEmployeeForm);
    filterEmployeeFormController.addFilterForm(_filterDirectorForm);
    filterEmployeeFormController.addFilterForm(_filterHrManagerForm);

    const filterDirectorFormController = new FilterFormVisibilityController(_filterDirectorForm);
    filterDirectorFormController.addFilterForm(_filterEmployeeForm);
    filterDirectorFormController.addFilterForm(_filterHrManagerForm);

    const filterHrManagerFormController = new FilterFormVisibilityController(_filterHrManagerForm);
    filterHrManagerFormController.addFilterForm(_filterEmployeeForm);
    filterHrManagerFormController.addFilterForm(_filterDirectorForm);

    return{
        employeeCreateForm,
        employeeEditForm,
        appointmentDirectorConfirmForm,
        appointmentHrManagerConfirmForm,
        unActualizeHrManagerConfirmForm,
        filterEmployeeFormController,
        filterDirectorFormController,
        filterHrManagerFormController,
    }
}