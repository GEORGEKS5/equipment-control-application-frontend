import HeaderBlock from '../components/headerBlock';
import DataTable from '../components/table/dataTable';
import FormEquipEdit from '../components/supervisorView/formEquipEdit';

import ContentBlock from '../layouts/contentBlock';
import ContentBlockSection from '../layouts/contentBlockSection';
import ContentBlockSplitSection from '../layouts/contentBlockSplitSection';
import ContentSection from '../layouts/contentSection';
import ContentSplitSection from '../layouts/contentSplitSection';

import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import SectionData from "../layouts/slots/sectionData";
import SectionHeader from "../layouts/slots/sectionHeader";
import SectionFooter from "../layouts/slots/sectionFooter";

import useSupervisorRepository from '../hooks/useSupervisorRepository';
import useSupervisorViewDataTable from '../hooks/useSupervisorViewDataTable';

function SupervisorView(){
    const {supervisorPinedEquipment, pinReadyEquipment, getPinedEquipmentRepository, getPinReadyEquipmentRepository, getUnitedRepository} = useSupervisorRepository();
    const {pinReadyEquipmentTable, supervisorPinedEquipmentTable} = useSupervisorViewDataTable();

    console.log(pinReadyEquipmentTable);

    return (
        <>
            <FormEquipEdit
                visible={equipEditForm.visible}
                editEquipment={equipEditForm.selectedModel}
                hideWindow={equipEditForm.hide()}
                updateData={updateAfterEquipEdit}
                propUpdated={updateAfterPropertyEdit}>
            </FormEquipEdit>

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
                                <SectionFooter>
                                    <h4>Закрепить оборудование по SN</h4>
                                </SectionFooter>
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
                                    ></DataTable>
                                </SectionData>
                                <SectionFooter>
                                    <h4>Добавить новое</h4>
                                </SectionFooter>
                            </ContentSection>
                        </ContentBlockSection> 
                    </SideBar>  
                </ContentBlock>
            </div>
        </>
    )
}

export default SupervisorView;