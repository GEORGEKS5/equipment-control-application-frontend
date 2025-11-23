import DialogWindow from '../layouts/dialogWindow';
import DataTable from '../components/table/dataTable';
import FormField from '../layouts/slots/formField';

function DataTableForm({formVisible, tableData, tableHeader, hideForm}) {
    return (
        <DialogWindow 
            visibleForm={formVisible}
            hideForm={hideForm}>
            <FormField>
                <DataTable
                    tableData={tableData}
                    tableStructure={tableHeader}>
                </DataTable>
            </FormField>
        </DialogWindow>
    )
}

export default DataTableForm;