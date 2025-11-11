import HeaderBlock from '../components/headerBlock';
import DataTable from '../components/table/dataTable';
import FormEquipEdit from '../components/supervisorView/formEquipEdit';
import FormEquipNew from '../components/supervisorView/formEquipNew';

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

import useSupervisorRepository from '../hooks/supervisor/useSupervisorRepository';
import useSupervisorViewDataTable from '../hooks/supervisor/useSupervisorViewDataTable';
import useSupervisorFormModel from '../hooks/supervisor/useSupervisorFormModel';

function SupervisorView(){
    const {supervisorPinedEquipment, pinReadyEquipment, getPinedEquipmentRepository, getPinReadyEquipmentRepository, getUnitedRepository, setPinReadyEquipment} = useSupervisorRepository();
    const {pinReadyEquipmentTable, supervisorPinedEquipmentTable} = useSupervisorViewDataTable();
    const {equipCreateForm, equipEditForm, equipFixationForm, filterPinReadyFormController, filterSupervisorPinedEquipFormController, fixEquipBySNForm } = useSupervisorFormModel();

    function updateAfterEquipEdit(val){ 
        let index = pinReadyEquipment.findIndex(item =>{
            console.log(item);
            return item.SerialNumber === val.SerialNumber
        });

        let tempPinReadyEq = [...pinReadyEquipment];
        tempPinReadyEq.splice(index, 1, val);

        setPinReadyEquipment(tempPinReadyEq);

        setEquipEditFormVisibility(false);
        equipEditForm.hide();
    }

    function updateAfterPropertyEdit(){
        getUnitedRepository();
    }

    function editButtonClick(e){
        equipEditForm.show(e, pinReadyEquipment);
    }

    function tableButtonClick(buttonType, e){  
        switch (buttonType) {
            case 'editButtonClick': editButtonClick(e)
                break;
            default:
                break;
        }
    }

    function updateAfterEquipCreate(){
        getPinReadyEquipmentRepository();
        equipCreateForm.hide();
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
                                        tableData={supervisorPinedEquipment}
                                        tableStructure={supervisorPinedEquipmentTable.header}
                                    ></DataTable>
                                </SectionData>
                                <ContentSectionFooter>
                                    <h4>Закрепить оборудование по SN</h4>
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
                                        tableData={pinReadyEquipment}
                                        tableStructure={pinReadyEquipmentTable.header}
                                        tableActionButton={pinReadyEquipmentTable.button}
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