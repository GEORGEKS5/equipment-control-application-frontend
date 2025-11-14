import { BasicForm, EmployeeIdentifierOnlyModelForm, EmployeeModelForm, FilterForm, FilterFormVisibilityController } from "../../helpers/classes"

export default function(){
    const employeeDismissForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const employeeAppointForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const employeeReAppointForm = new EmployeeModelForm({UserName: ''});
    const addressDisplayForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const addressEditForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const registeredEmployeeEditForm = new EmployeeModelForm({UserName: ''});
    const employeeCreateForm = new BasicForm();
    const _filterAppointedEmployeeForm = new FilterForm('filterAppointedEmployee');
    const _filterAppointReadyEmployeeForm = new FilterForm('filterAppointReadyEmployee');

    const filterAppointedEmployeeFormController = new FilterFormVisibilityController(_filterAppointedEmployeeForm);
    filterAppointedEmployeeFormController.addFilterForm(_filterAppointReadyEmployeeForm);

    const filterAppointReadyEmployeeFormController = new FilterFormVisibilityController(_filterAppointReadyEmployeeForm);
    filterAppointReadyEmployeeFormController.addFilterForm(_filterAppointedEmployeeForm);

    return{
        employeeDismissForm,
        employeeAppointForm,
        employeeReAppointForm,
        addressDisplayForm,
        addressEditForm,
        registeredEmployeeEditForm,
        employeeCreateForm,
        filterAppointedEmployeeFormController,
        filterAppointReadyEmployeeFormController,
    }
}