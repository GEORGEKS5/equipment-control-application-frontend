import useEmployeeRepository from '../../hooks/useEmployeeRepository';
import useEmployeeDataTable from '../../hooks/useEmployeeDataTable';
import DialogView from '../../layouts/dialogWindow';
import FormField from '../../layouts/slots/formField';
import FormFooter from '../../layouts/slots/formFooter';
import DataTable from '../../components/table/dataTable';
import getRequestPromise from '../../helpers/lib';
import { useContext } from 'react';
import UserContext from '../../context/user';
import DefaultButton from '../UI/defaultButton';

function SupervisorAppointment({formVisible, objectIdentificator, hideForm, supervisorAppointed}) {
        const {USER_STATE} = useContext(UserContext);
        const {employeesModel} = useEmployeeRepository(formVisible);
        const {tableHeader, tableActionButton, clearTableHeader} = useEmployeeDataTable(formVisible);

        function hideCurrentForm(){
            clearTableHeader();
            hideForm();
        }

        function appointObjectSupervisor(clickType, event){
            const serverUrl = USER_STATE.getServerUrlAddress();
            const endPointName = 'AppointObjectSupervisor';
            const UserName = event.currentTarget.value;
            const DirectorName = USER_STATE.userName;
            const ObjectID = Number(objectIdentificator);
            const requestBody = { UserName, DirectorName, ObjectID };
            
            const appointmentRequestPromise = getRequestPromise(serverUrl, endPointName, requestBody);

            appointmentRequestPromise.then(()=>{
                supervisorAppointed();
                clearTableHeader();
            });
        }
    return (
        <DialogView 
            visibleForm={formVisible}
            hideForm={hideCurrentForm}>
            <FormField>
                <DataTable
                    tableData={employeesModel}
                    tableStructure={tableHeader}
                    tableActionButton={tableActionButton}
                    buttonClick={appointObjectSupervisor}
                ></DataTable>
            </FormField>
            <FormFooter>
                <DefaultButton
                    buttonCaption="Закрыть"
                    buttonClass="form"
                    buttonClick={hideCurrentForm}
                ></DefaultButton>
            </FormFooter>
        </DialogView>
    )
}

export default SupervisorAppointment;