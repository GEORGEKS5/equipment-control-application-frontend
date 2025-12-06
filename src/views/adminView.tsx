import useEmployeeRepository from '../hooks/admin/useEmployeeRepository';
import useAdminDataTable from '../hooks/admin/useAdminDataTable';
import useFilterEmployeeModel from '../hooks/admin/useFilterEmployeeModel';
import useAdminFormModel from '../hooks/admin/useAdminFormModel';
import getRequestPromise from "../helpers/lib";
import getFullDate from '../helpers/getFullDate';
import { FilterForm } from '../helpers/classes';
import ContentBlock from '../layouts/contentBlock';
import ContentBlockSection from '../layouts/contentBlockSection';
import ContentBlockSplitSection from '../layouts/contentBlockSplitSection';
import ContentSplitSection from '../layouts/contentSplitSection';
import SectionData from "../layouts/slots/sectionData";
import SectionHeader from "../layouts/slots/sectionHeader";
import SectionFooter from "../layouts/slots/sectionFooter";
import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import HeaderBlock from '../components/headerBlock.tsx';
import DataTable from '../components/table/dataTable';
import EmployeeCreate from '../components/hrManagerView/employeeCreate';
import EmployeeEdit from '../components/hrManagerView/registeredEmployeeEdit';
import ConfirmForm from '../components/ConfirmForm';
import DataOrder from '../components/dataOrderForm';
import { useContext } from 'react';
import UserContext from '../context/user';
import { TUserContext } from '../helpers/types';
import { IMouseEvent } from '../helpers/interfaces';
import ContentSection from '../layouts/contentSection';
import ContentSectionFooter from '../layouts/slots/contentSectionFooter';

function AdminView(){
    const {USER_STATE} = useContext<{USER_STATE: TUserContext}>(UserContext);
    const {employeeInitialRepository, directorInitialRepository, hrManagerInitialRepository, getCoreRepositories, getEmployeeRepository, getHrManagerRepository, getDirectorRepository,} = useEmployeeRepository();
    const {filteredEmployeeModel, filteredDirectorModel, filteredHrManagerModel, setFilteredDirectorModel, setFilteredEmployeeModel, setFilteredHrManagerModel} = useFilterEmployeeModel(employeeInitialRepository, directorInitialRepository, hrManagerInitialRepository);
    const {employeeTable, directorTable, hrManagerTable} = useAdminDataTable();
    const {employeeCreateForm, employeeEditForm, appointmentDirectorConfirmForm, appointmentHrManagerConfirmForm, unActualizeHrManagerConfirmForm, filterEmployeeFormController, filterDirectorFormController, filterHrManagerFormController} = useAdminFormModel();

    function updateAfterEmployeeEdition(){
        employeeEditForm.hide();
        getEmployeeRepository();
    }

    function updateAfterEmployeeRegistration(){
        employeeCreateForm.hide();
        getEmployeeRepository();
    }

    function setOrderedEmployeeModel(orderedModel: never[]){
        setFilteredEmployeeModel(orderedModel);
        filterEmployeeFormController.activeForm.hide();
    }

    function setOrderedDirectorModel(orderedModel: never[]){
        setFilteredDirectorModel(orderedModel);
        filterDirectorFormController.activeForm.hide();
    }

    function setOrderedHrManagerModel(orderedModel: never[]){
        setFilteredHrManagerModel(orderedModel);
        filterHrManagerFormController.activeForm.hide();
    }

    function appointDirector(){
        const endPointName = 'appointDirector';
        const servAddress = USER_STATE.getServerUrlAddress();
        
        const requestPromise = getRequestPromise(servAddress, endPointName, {
            userName: appointmentDirectorConfirmForm.selectedModel.UserName,
            appointmentDate: getFullDate(),
        });

        requestPromise.then(resp=>{
            console.log('Resp ok - ' + resp.ok);

            if(resp.ok){
                getDirectorRepository().then(()=>{
                    getEmployeeRepository();
                })
            }

            appointmentDirectorConfirmForm.hide();
        })
    }

    function appointHrManager(){
        const endPointName = 'appointHrManager';
        const servAddress = USER_STATE.getServerUrlAddress();

        const requestPromise = getRequestPromise(servAddress, endPointName, {
            userName: appointmentHrManagerConfirmForm.selectedModel.UserName,
            appointmentDate: getFullDate(),
            controllerName: USER_STATE.userName,
        });

        requestPromise.then(resp=>{
            console.log('Resp ok - ' + resp.ok);

            if(resp.ok){
                getHrManagerRepository().then(()=>{
                    getEmployeeRepository();
                })
            }

            appointmentHrManagerConfirmForm.hide();
        })
    }

    function unActualizeHrManager(){
        const endPointName = 'unActualizeHrManager';
        const servAddress = USER_STATE.getServerUrlAddress();

        const requestPromise = getRequestPromise(servAddress, endPointName, {
            userName: unActualizeHrManagerConfirmForm.selectedModel.UserName,
        });

        requestPromise.then(resp=>{
            if(resp.ok){
                getHrManagerRepository().then(()=>{
                    getEmployeeRepository();
                })
            }

            unActualizeHrManagerConfirmForm.hide();
        })
    }

    function employeeTableButtonClick(eventType: string, e: IMouseEvent) {
        switch (eventType) {
            case 'editEmployee': employeeEditForm.show(e, filteredEmployeeModel); break;
            case 'showAppointmentDirectorConfirmForm': appointmentDirectorConfirmForm.show(e); break;
            case 'showAppointmentHrManagerConfirmForm': appointmentHrManagerConfirmForm.show(e); break;
            default:
                break;
        }
    
    }
    function directorTableButtonClick(eventType: string, e: Event) {

    }

    function hrManagerTableButtonClick(eventType:string, e: IMouseEvent) {
        switch (eventType) {
            case 'unActualizeHrManager': unActualizeHrManagerConfirmForm.show(e); break;                
        
            default:
                break;
        }
    }

    return (
        <>
            <DataOrder
                clientRect={FilterForm.absoluteFormClientRect}
                formVisible={filterEmployeeFormController.activeForm.visible}
                originFilterObject={employeeInitialRepository}
                originSortObject={filteredEmployeeModel}
                orderCategory={filterEmployeeFormController.activeForm.filterCategory}
                hideForm={() => {filterEmployeeFormController.activeForm.hide()}}
                elementOrdered={setOrderedEmployeeModel}>
            </DataOrder>

            <DataOrder
                clientRect={FilterForm.absoluteFormClientRect}
                formVisible={filterDirectorFormController.activeForm.visible}
                originFilterObject={directorInitialRepository}
                originSortObject={filteredDirectorModel}
                orderCategory={filterDirectorFormController.activeForm.filterCategory}
                hideForm={() => {filterDirectorFormController.activeForm.hide()}}
                elementOrdered={setOrderedDirectorModel}>
            </DataOrder>

            <DataOrder
                clientRect={FilterForm.absoluteFormClientRect}
                formVisible={filterHrManagerFormController.activeForm.visible}
                originFilterObject={hrManagerInitialRepository}
                originSortObject={filteredHrManagerModel}
                orderCategory={filterHrManagerFormController.activeForm.filterCategory}
                hideForm={() => {filterHrManagerFormController.activeForm.hide()}}
                elementOrdered={setOrderedHrManagerModel}>
            </DataOrder>

            <EmployeeCreate
                formVisible={employeeCreateForm.visible}
                hideForm={() => {employeeCreateForm.hide()}}
                employeeRegistred={updateAfterEmployeeRegistration}>
            </EmployeeCreate>

            <EmployeeEdit
                formVisible={employeeEditForm.visible}
                editableEmployeeModel={employeeEditForm.selectedModel}
                hideForm={() => {employeeEditForm.hide()}}
                employeeRegistred={updateAfterEmployeeEdition}>
            </EmployeeEdit>

            <ConfirmForm
                formVisible={appointmentDirectorConfirmForm.visible}
                formCaption="Назначить директором организации"
                hideForm={() => {appointmentDirectorConfirmForm.hide()}}
                taskCanceled={() => {appointmentDirectorConfirmForm.hide()}}
                taskConfirmed={appointDirector}>
            </ConfirmForm>
            <ConfirmForm
                formVisible={appointmentHrManagerConfirmForm.visible}
                formCaption="Назначить сотрудником отдела кадров"
                hideForm={()=>{appointmentHrManagerConfirmForm.hide()}}
                taskCanceled={()=>{appointmentHrManagerConfirmForm.hide()}}
                taskConfirmed={appointHrManager}>
            </ConfirmForm>
            <ConfirmForm
                formVisible={unActualizeHrManagerConfirmForm.visible}
                formCaption="Больше не является сотрудником отдела кадров"
                hideForm={() => {unActualizeHrManagerConfirmForm.hide()}}
                taskCanceled={() => {unActualizeHrManagerConfirmForm.hide()}}
                taskConfirmed={unActualizeHrManager}>
            </ConfirmForm>

            <div id="rootEl" className="flexParent">
                <HeaderBlock></HeaderBlock>
                <ContentBlock>
                    <MainContent>
                        <ContentBlockSection>
                            <ContentSection>
                                <SectionHeader>
                                    <h3>Сотрудники организации</h3>
                                </SectionHeader>
                                <SectionData>
                                    <DataTable
                                        tableData={filteredEmployeeModel}
                                        tableStructure={employeeTable.header}
                                        tableActionButton={employeeTable.button}
                                        buttonClick={employeeTableButtonClick}
                                        filterButtonClick={(e: IMouseEvent) => (filterEmployeeFormController.showActiveForm(e))}>
                                    </DataTable>
                                </SectionData>
                                <SectionFooter>
                                    <ContentSectionFooter
                                        buttonCaption="Зарегистировать нового"
                                        buttonClick={() => {employeeCreateForm.show()}}>
                                    </ContentSectionFooter>
                                </SectionFooter>
                            </ContentSection>
                        </ContentBlockSection>
                    </MainContent>
                    <SideBar>
                        <ContentBlockSplitSection>
                            <SectionHeader>
                                <ContentSplitSection>
                                    <SectionHeader>
                                        <h3>Директора организации</h3>
                                    </SectionHeader>
                                    <SectionData>
                                        <DataTable
                                            tableData={filteredDirectorModel}
                                            tableStructure={directorTable.header}
                                            tableActionButton={directorTable.button}
                                            buttonClick={()=>{}}
                                            filterButtonClick={(e: IMouseEvent) => {filterDirectorFormController.showActiveForm(e)}}>
                                        </DataTable>
                                    </SectionData>
                                </ContentSplitSection>
                            </SectionHeader>
                            <SectionFooter>
                                <ContentSplitSection>
                                    <SectionHeader>
                                        <h3>Специалисты отдела кадров</h3>
                                    </SectionHeader>
                                    <SectionData>
                                        <DataTable
                                            tableData={filteredHrManagerModel}
                                            tableStructure={hrManagerTable.header}
                                            tableActionButton={hrManagerTable.button}
                                            buttonClick={hrManagerTableButtonClick}
                                            filterButtonClick={(e: IMouseEvent) => {filterHrManagerFormController.showActiveForm(e)}}>
                                        </DataTable>
                                    </SectionData>
                                </ContentSplitSection>
                            </SectionFooter>
                        </ContentBlockSplitSection>
                    </SideBar>
                </ContentBlock>
            </div>
        </>
    )
}

export default AdminView;