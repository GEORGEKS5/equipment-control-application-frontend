import { BasicForm, EquipmentModelForm, FilterForm, FilterFormVisibilityController } from "../helpers/classes";

export default function(){
    const equipCreateForm = new BasicForm();
    const fixEquipBySNForm = new BasicForm();
    const equipEditForm = new EquipmentModelForm({SerialNumber: ''});
    const equipFixationForm = new EquipmentModelForm({SerialNumber: ''});
    const filterPinReadyForm = new FilterForm('filterPinReady');
    const filterSupervisorPinedEquipForm = new FilterForm('filterSupervisorPinedEquip');

    const filterPinReadyFormController = new FilterFormVisibilityController(filterPinReadyForm);
    filterPinReadyFormController.addFilterForm(filterSupervisorPinedEquipForm);

    const filterSupervisorPinedEquipFormController = new FilterFormVisibilityController(filterSupervisorPinedEquipForm);
    filterSupervisorPinedEquipFormController.addFilterForm(filterPinReadyForm);

    return{
        equipCreateForm,
        fixEquipBySNForm,
        equipEditForm,
        equipFixationForm,
        filterPinReadyFormController,
        filterSupervisorPinedEquipFormController,
    }
}