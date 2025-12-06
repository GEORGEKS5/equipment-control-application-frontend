import HeaderBlock from '../components/headerBlock.tsx';
import DataTable from '../components/table/dataTable';
import FormEquipEdit from '../components/supervisorView/formEquipEdit';
import FormEquipNew from '../components/supervisorView/formEquipNew';
import DataOrderForm from '../components/dataOrderForm';
import EmployeeSelectForm from '../components/supervisorView/employeeSelectForm';

import ContentBlock from '../layouts/contentBlock';
import ContentBlockSection from '../layouts/contentBlockSection';
import ContentBlockSplitSection from '../layouts/contentBlockSplitSection';
import ContentSection from '../layouts/contentSection';
import ContentSplitSection from '../layouts/contentSplitSection';

import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import SectionData from "../layouts/slots/sectionData";
import SectionHeader from "../layouts/slots/sectionHeader";
import ContentSectionFooter from "../layouts/slots/contentSectionFooter";

import { FilterForm } from '../helpers/classes';
import useSupervisorRepository from '../hooks/supervisor/useSupervisorRepository';
import useSupervisorViewDataTable from '../hooks/supervisor/useSupervisorViewDataTable';
import useSupervisorFormModel from '../hooks/supervisor/useSupervisorFormModel';
import useSupervisorFilterRepository from '../hooks/supervisor/useSupervisorFilterRepository';

function SupervisorView(){
    const {supervisorPinedEquipment, pinReadyEquipment, getPinedEquipmentRepository, getPinReadyEquipmentRepository, getUnitedRepository, setPinReadyEquipment} = useSupervisorRepository();
    const {pinReadyEquipmentTable, supervisorPinedEquipmentTable} = useSupervisorViewDataTable();
    const {filterSupervisorPinedEquipment, filterPinReadyEquipment, setFilterPinReadyEquipment, setFilterSupervisorPinedEquipment} = useSupervisorFilterRepository(supervisorPinedEquipment, pinReadyEquipment);
    const {equipCreateForm, equipEditForm, equipFixationForm, filterPinReadyFormController, filterSupervisorPinedEquipFormController, fixEquipBySNForm } = useSupervisorFormModel();

    function updateAfterEquipEdit(val){ 
        let index = pinReadyEquipment.findIndex(item =>{
            console.log(item);
            return item.SerialNumber === val.SerialNumber
        });

        let tempPinReadyEq = [...pinReadyEquipment];
        tempPinReadyEq.splice(index, 1, val);

        setPinReadyEquipment(tempPinReadyEq);
        equipEditForm.hide();
    }

    function updateAfterPropertyEdit(){
        getUnitedRepository();
    }

    function tableButtonClick(buttonType, e){  
        switch (buttonType) {
            case 'editButtonClick': equipEditForm.show(e, pinReadyEquipment);
                break;
            case 'pinButtonClick': equipFixationForm.show(e, pinReadyEquipment);
                break;
            default:
                break;
        }
    }

    function updateAfterEquipCreate(){
        getPinReadyEquipmentRepository();
        equipCreateForm.hide();
    }

    function updateAfterEquipFixationBySN(){
        getUnitedRepository();
        fixEquipBySNForm.hide();
    }
    
    function updateAfterEquipFixation(){
        getUnitedRepository();
        equipFixationForm.hide();
    }


    function setOrderedSupervisorPinedEquipToView(elements){
        setFilterSupervisorPinedEquipment(elements);
        filterSupervisorPinedEquipFormController.activeForm.hide();
    }
    
    function setOrderedPinReadyEquipToView(elements){
        setFilterPinReadyEquipment(elements);
        filterPinReadyFormController.activeForm.hide();
    }

    return (
        <>
            <FormEquipEdit 
                visible={equipEditForm.visible}
                hideWindow={() => {equipEditForm.hide()}}
                updateData={updateAfterEquipEdit}
                editEquipment={equipEditForm.selectedModel}
                propUpdated={updateAfterPropertyEdit}>
            </FormEquipEdit>
            <FormEquipNew
                visible={equipCreateForm.visible}
                updateData={updateAfterEquipCreate}
                hideWindow={() => {equipCreateForm.hide()}}>
            </FormEquipNew>
            <EmployeeSelectForm 
                formVisible={fixEquipBySNForm.visible}
                hideForm={() => {fixEquipBySNForm.hide()}}
                employeeSelected={updateAfterEquipFixationBySN}
                propEdited="">
            </EmployeeSelectForm>
            <EmployeeSelectForm 
                formVisible={equipFixationForm.visible}
                equipmentSerialNumber={equipFixationForm.selectedModel.SerialNumber}
                hideForm={() => {equipFixationForm.hide()}}
                employeeSelected={updateAfterEquipFixation}
                propEdited={updateAfterPropertyEdit}>
            </EmployeeSelectForm>

            <DataOrderForm
                formVisible={filterPinReadyFormController.activeForm.visible}
                originFilterObject={pinReadyEquipment}
                originSortObject={filterPinReadyEquipment}
                orderCategory={filterPinReadyFormController.activeForm.filterCategory}
                clientRect={FilterForm.absoluteFormClientRect}
                elementOrdered={setOrderedPinReadyEquipToView}
                hideForm={() => {filterPinReadyFormController.activeForm.hide()}}
            ></DataOrderForm>

            <DataOrderForm
                formVisible={filterSupervisorPinedEquipFormController.activeForm.visible}
                originFilterObject={supervisorPinedEquipment}
                originSortObject={filterSupervisorPinedEquipment}
                orderCategory={filterSupervisorPinedEquipFormController.activeForm.filterCategory}
                clientRect={FilterForm.absoluteFormClientRect}
                elementOrdered={setOrderedSupervisorPinedEquipToView}
                hideForm={() => {filterSupervisorPinedEquipFormController.activeForm.hide()}}
            ></DataOrderForm>

            <div id="rootEl" className="flexParent">
                <HeaderBlock></HeaderBlock>

                <ContentBlock>
                    <MainContent>
                        <ContentBlockSection>
                            <ContentSection>
                                <SectionHeader>
                                    <h3 id="contentHeader">Закреплено</h3>
                                </SectionHeader>
                                <SectionData>
                                    <DataTable
                                        tableData={filterSupervisorPinedEquipment}
                                        tableStructure={supervisorPinedEquipmentTable.header}
                                        filterButtonClick={e => filterSupervisorPinedEquipFormController.showActiveForm(e)}
                                    ></DataTable>
                                </SectionData>
                                <ContentSectionFooter
                                    buttonCaption='Закрепить оборудование по SN'
                                    buttonClick={() => {fixEquipBySNForm.show()}}>
                                </ContentSectionFooter>
                            </ContentSection>
                        </ContentBlockSection>
                    </MainContent>

                    <SideBar>
                        <ContentBlockSection>
                            <ContentSection>
                                <SectionHeader>
                                    <h3 id="contentHeader">Доступно</h3>
                                </SectionHeader>
                                <SectionData>
                                    <DataTable
                                        tableData={filterPinReadyEquipment}
                                        tableStructure={pinReadyEquipmentTable.header}
                                        tableActionButton={pinReadyEquipmentTable.button}
                                        filterButtonClick={e => filterPinReadyFormController.showActiveForm(e)}
                                        buttonClick={tableButtonClick}
                                    ></DataTable>
                                </SectionData>
                                <ContentSectionFooter
                                    buttonCaption='Добавить новое'
                                    buttonClick={() => {equipCreateForm.show()}}>
                                </ContentSectionFooter>
                            </ContentSection>
                        </ContentBlockSection> 
                    </SideBar>  
                </ContentBlock>
            </div>
        </>
    )
}

export default SupervisorView;