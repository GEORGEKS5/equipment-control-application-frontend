import HeaderBlock from "../components/headerBlock";
import DataTable from "../components/table/dataTable.jsx";
import DataOrderForm from "../components/dataOrderForm.jsx";

import ContentSingleBlock from "../layouts/contentBlock";
import ContentBlockSection from "../layouts/contentBlockSection";
import ContentSection from "../layouts/contentSection";
import ContentSectionFooter from "../layouts/slots/contentSectionFooter.jsx";

import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import SectionData from "../layouts/slots/sectionData";
import SectionHeader from "../layouts/slots/sectionHeader";
import SectionFooter from "../layouts/slots/sectionFooter";

import useFullEmployeeRepository from '../hooks/hrmanager/useFullEmployeeRepository.js';
import useHRManagerViewDataTable from "../hooks/hrmanager/useHRManagerViewDataTable";
import useHRManagerFormModel from "../hooks/hrmanager/useHRManagerFormModel";
import useFilterEmployeeModel from '../hooks/hrmanager/useFilterEmployeeModel.js';

import { FilterForm } from "../helpers/classes";
import { useEffect } from "react";

import EmployeeDismissConfirm from "../components/hrmanagerView/employeeDismissConfirm.jsx";
import EmployeeCreateForm from "../components/hrmanagerView/employeeCreate.jsx";
import AddressDisplayForm from "../components/hrmanagerView/addressDisplayForm.jsx";
import EmployeeAppointment from "../components/hrmanagerView/employeeAppointment.jsx";
import AddressEditForm from "../components/hrmanagerView/addressEditForm.jsx";
import EmployeeReAppointment from "../components/hrmanagerView/employeeReAppointment.jsx";
import RegisteredEmployeeEdit from "../components/hrmanagerView/registeredEmployeeEdit.jsx";

function HRManagerView(){
    const {appointReadyEmployeeTable, appointedEmployeeTable, createAppointReadyEmployeeTable, createAppointedEmployeeTable} = useHRManagerViewDataTable();
    const {appointedEmployeesInitialRepository, appointmentReadyEmployeesInitialRepository, getAppointedEmployeeRepository, getAppointmentReadyEmployeeRepository} = useFullEmployeeRepository();
    const {filterAppointReadyEmployee, filterAppointedEmployee, setFilterAppointReadyEmployee, setFilterAppointedEmployee} = useFilterEmployeeModel(appointedEmployeesInitialRepository, appointmentReadyEmployeesInitialRepository);
    const {filterAppointReadyEmployeeFormController, 
            filterAppointedEmployeeFormController, 
            addressDisplayForm, 
            addressEditForm, 
            employeeAppointForm, 
            employeeCreateForm, 
            employeeDismissForm,
            employeeReAppointForm,
            registeredEmployeeEditForm} = useHRManagerFormModel();

    useEffect(()=>{
        createAppointReadyEmployeeTable();
        createAppointedEmployeeTable();

        getAppointedEmployeeRepository().then(val => {
            return getAppointmentReadyEmployeeRepository();
        });

    }, []);

    function appointReadyEmployeeTableButtonClick(clickType, e) {
        switch(clickType){
            case 'showEmployeeAppointForm': employeeAppointForm.show(e); break;
            case 'showRegisteredEmployeeEditForm': registeredEmployeeEditForm.show(e, filterAppointReadyEmployee); break;
            case 'showAddressEditForm': addressEditForm.show(e); break;
            default: ; break;
        }
    }

    function appointedEmployeesTableButtonClick(clickType, e) {
        switch(clickType){
            case 'showEmployeeDismissForm': employeeDismissForm.show(e); break;
            case 'showEmployeeReAppointForm': employeeReAppointForm.show(e, filterAppointedEmployee); break;
            case 'showAddressDisplayForm': addressDisplayForm.show(e); break;
            default: ; break;
        }
    }

    function registrateEmployee(){
        console.log('reg emp');
    }

    function setOrderedAppointedEmployeeModel(orderedModel){
        setFilterAppointedEmployee(() => {
            filterAppointedEmployeeFormController.activeForm.hide()
            return orderedModel;
        });
    }

    function setOrderedAppointReadyEmployeeModel(orderedModel){
        setFilterAppointReadyEmployee(() => {
            filterAppointReadyEmployeeFormController.activeForm.hide();
            return orderedModel;
        })
    }

    function updateAppointmentReadyEmployee(){
        getAppointmentReadyEmployeeRepository().then(()=>{
            employeeCreateForm.hide();
        });
    }

    function updateAddressEditForm(){
        getAppointmentReadyEmployeeRepository().then(()=>{
            addressEditForm.hide();
        });
    }

    function updateRegisteredEmployee(){
        getAppointmentReadyEmployeeRepository().then(()=>{
            registeredEmployeeEditForm.hide()
        });
    }

    function updateAppointedEmployee(){
        getAppointedEmployeeRepository().then(()=>{
            employeeDismissForm.hide();
        });
    }

    function updateAppointedEmployeeAndHideReappointForm(){
        getAppointedEmployeeRepository().then(()=>{
            employeeReAppointForm.hide();
        });
    }

    function updateEmployeeList(){
        getAppointmentReadyEmployeeRepository().then(async ()=>{
            await getAppointedEmployeeRepository();
            employeeAppointForm.hide();
        });
    }

    return (
        <>
            <EmployeeDismissConfirm
                formVisible={employeeDismissForm.visible}
                activeEmployeeUserName={employeeDismissForm.selectedModel.UserName}
                hideForm={()=>{employeeDismissForm.hide()}}
                employeeDissmissed={updateAppointedEmployee}>
            </EmployeeDismissConfirm>

            <EmployeeCreateForm
                formVisible={employeeCreateForm.visible}
                hideForm={() => {employeeCreateForm.hide()}}
                employeeRegistred={updateAppointmentReadyEmployee}>
            </EmployeeCreateForm>

            <AddressDisplayForm
                formVisible={addressDisplayForm.visible}
                activeEmployeeUserName={addressDisplayForm.selectedModel.UserName}
                hideForm={()=>{addressDisplayForm.hide()}}>
            </AddressDisplayForm>

            <AddressEditForm
                formVisible={addressEditForm.visible}
                activeEmployeeUserName={addressEditForm.selectedModel.UserName}
                hideForm={() => {addressEditForm.hide()}}
                employeeRegistred={updateAddressEditForm}>
            </AddressEditForm>

            <EmployeeAppointment
                formVisible={employeeAppointForm.visible}
                employeeId ={employeeAppointForm.selectedModel.UserName}
                hideForm={() => {employeeAppointForm.hide()}}
                employeeAppointed={updateEmployeeList}>
            </EmployeeAppointment>

            <EmployeeReAppointment
                formVisible={employeeReAppointForm.visible}
                reAppointEmployee={employeeReAppointForm.selectedModel}
                hideForm={() => {employeeReAppointForm.hide()}}
                employeeAppointed={updateAppointedEmployeeAndHideReappointForm}>
            </EmployeeReAppointment>

            <RegisteredEmployeeEdit
                formVisible={registeredEmployeeEditForm.visible}
                editableEmployeeModel={registeredEmployeeEditForm.selectedModel}
                hideForm={() => {registeredEmployeeEditForm.hide()}}
                employeeRegistred={updateRegisteredEmployee}>
            </RegisteredEmployeeEdit>

            <DataOrderForm
                formVisible={filterAppointReadyEmployeeFormController.activeForm.visible}
                originFilterObject={appointmentReadyEmployeesInitialRepository}
                originSortObject={filterAppointReadyEmployee}
                orderCategory={filterAppointReadyEmployeeFormController.activeForm.filterCategory}
                clientRect={FilterForm.absoluteFormClientRect}
                elementOrdered={setOrderedAppointReadyEmployeeModel}
                hideForm={() => {filterAppointReadyEmployeeFormController.activeForm.hide()}}
            ></DataOrderForm>

            <DataOrderForm
                formVisible={filterAppointedEmployeeFormController.activeForm.visible}
                originFilterObject={appointedEmployeesInitialRepository}
                originSortObject={filterAppointedEmployee}
                orderCategory={filterAppointedEmployeeFormController.activeForm.filterCategory}
                clientRect={FilterForm.absoluteFormClientRect}
                elementOrdered={setOrderedAppointedEmployeeModel}
                hideForm={() => {filterAppointedEmployeeFormController.activeForm.hide()}}
            ></DataOrderForm>

            <div id="rootEl" className="flexParent">
                <HeaderBlock />
                <ContentSingleBlock>
                    <MainContent>
                        <ContentBlockSection>
                            <ContentSection>
                                <SectionHeader>
                                    <h3 id="contentHeader">СОТРУДНИКИ ОРГАНИЗАЦИИ</h3>
                                </SectionHeader>
                                <SectionData>
                                    <DataTable
                                        tableData={filterAppointedEmployee}
                                        tableStructure={appointedEmployeeTable.header}
                                        tableActionButton={appointedEmployeeTable.button}
                                        buttonClick={appointedEmployeesTableButtonClick}
                                        filterButtonClick={e => filterAppointedEmployeeFormController.showActiveForm(e)}>
                                    </DataTable>
                                </SectionData>
                            </ContentSection>
                        </ContentBlockSection>
                    </MainContent>
                    <SideBar>
                         <ContentBlockSection>
                            <ContentSection>
                                <SectionHeader>
                                    <h3 id="contentHeader">НОВЫЕ СОТРУДНИКИ ОРГАНИЗАЦИИ</h3>
                                </SectionHeader>
                                <SectionData>
                                    <DataTable
                                        tableData={filterAppointReadyEmployee}
                                        tableStructure={appointReadyEmployeeTable.header}
                                        tableActionButton={appointReadyEmployeeTable.button}
                                        buttonClick={appointReadyEmployeeTableButtonClick}
                                        filterButtonClick={e => filterAppointReadyEmployeeFormController.showActiveForm(e)}>
                                    </DataTable>
                                </SectionData>
                                <SectionFooter>
                                    <ContentSectionFooter
                                        buttonCaption="Create New"
                                        buttonClick={() => {employeeCreateForm.show()}}
                                    ></ContentSectionFooter>
                                </SectionFooter>
                            </ContentSection>
                        </ContentBlockSection>
                    </SideBar>
                </ContentSingleBlock>
            </div>
        </>
    )
}

export default HRManagerView;