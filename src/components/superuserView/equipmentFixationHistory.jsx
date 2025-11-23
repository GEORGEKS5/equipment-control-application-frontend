import useEquipmentHistoryDataTable from '../../hooks/useEquipmentHistoryDataTable';
import useEquipmentHistoryRepository from '../../hooks/useEquipmentHistoryRepository';
import DataTableForm from '../../components/dataTableForm';

function EquipmentFixationHistory({formVisible = false, activeEquipmentSerialNumber = '', hideForm}) {
    const { tableHeader, clearTableHeader } = useEquipmentHistoryDataTable(formVisible);
    const { equipmentFixationRepository } = useEquipmentHistoryRepository(activeEquipmentSerialNumber, formVisible);

    function hideCurrentForm(){
        clearTableHeader();
        hideForm();
    }

    return (
        <DataTableForm
            formVisible={formVisible}
            tableData={equipmentFixationRepository}
            tableHeader={tableHeader}
            hideForm={hideCurrentForm}>
        </DataTableForm>
    )
}

export default EquipmentFixationHistory;