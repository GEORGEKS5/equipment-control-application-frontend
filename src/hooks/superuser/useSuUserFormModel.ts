import { BasicForm, ConstructiveObjectIdentifierOnlyModelForm, EmployeeIdentifierOnlyModelForm, EquipmentIdentifierOnlyModelForm, FilterForm, FilterFormVisibilityController } from "../../helpers/classes"

export default function(){
    const constructiveObjectCreationForm = new BasicForm();
    const supervisorAppointmentForm = new ConstructiveObjectIdentifierOnlyModelForm({objectIdentificator: ''});
    const objectUnactualizeConfirmForm = new ConstructiveObjectIdentifierOnlyModelForm({objectIdentificator: ''});
    const objectAppointmentHistoryForm = new ConstructiveObjectIdentifierOnlyModelForm({objectIdentificator: ''});
    const equipmentFixationHistoryForm = new EquipmentIdentifierOnlyModelForm({SerialNumber: ''});
    const equipmentFixationSupervisorDetailForm = new EmployeeIdentifierOnlyModelForm({UserName: ''});
    const _filterPinedEquipmentForm = new FilterForm('filterPinedEquipment');
    const _filterConstructiveObjectForm = new FilterForm('filterConstructiveObject');

    const filterPinedEquipmentFormController = new FilterFormVisibilityController(_filterPinedEquipmentForm);
    filterPinedEquipmentFormController.addFilterForm(_filterConstructiveObjectForm);

    const filterConstructiveObjectFormController = new FilterFormVisibilityController(_filterConstructiveObjectForm);
    filterConstructiveObjectFormController.addFilterForm(_filterPinedEquipmentForm);

    return{
        constructiveObjectCreationForm,
        supervisorAppointmentForm,
        objectUnactualizeConfirmForm,
        objectAppointmentHistoryForm,
        equipmentFixationHistoryForm,
        equipmentFixationSupervisorDetailForm,
        filterPinedEquipmentFormController,
        filterConstructiveObjectFormController,
    }
}