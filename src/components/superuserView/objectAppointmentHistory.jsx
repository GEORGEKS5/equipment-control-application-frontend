import useObjectAppointmentDataTable from '../../hooks/useObjectAppointmentDataTable';
import useObjectAppointmentRepository from '../../hooks/useObjectAppointmentRepository';
import DataTableForm from '../../components/dataTableForm';

function ObjectAppointmentHistory({formVisible, objectIdentificator, hideForm}) {
    const { objectRepository } = useObjectAppointmentRepository(formVisible, objectIdentificator);
    const { tableHeader, clearTableHeader } = useObjectAppointmentDataTable(formVisible);

    function hideCurrentForm(){
        clearTableHeader();
        hideForm();
    }

    return (
        <DataTableForm
            formVisible={formVisible}
            tableData={objectRepository}
            tableHeader={tableHeader}
            hideForm={hideCurrentForm}>
        </DataTableForm>
    )
}

export default ObjectAppointmentHistory;