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
import useSupervisorFormModel from '../hooks/useSupervisorFormModel';

function SupervisorView(){
    const {supervisorPinedEquipment, pinReadyEquipment, getPinedEquipmentRepository, getPinReadyEquipmentRepository, getUnitedRepository} = useSupervisorRepository();
    const {pinReadyEquipmentTable, supervisorPinedEquipmentTable} = useSupervisorViewDataTable();
    const {equipEditFormVisibility, setEquipEditFormVisibility, equipEditSelectedModel, setEquipEditSelectedModel} = useSupervisorFormModel(pinReadyEquipment);

    function updateAfterEquipEdit(val){ 
        console.log('updateAfterEquipEdit: ');
        console.log(val);
        let index = pinReadyEquipment.findIndex(item =>{
            return item.SerialNumber === val.SerialNumber
        });
        
        //this.pinReadyEquipment.splice(index, 1, val);
        setEquipEditFormVisibility(false);
    }

    function updateAfterPropertyEdit(){
        getUnitedRepository();
    }

    function editButtonClick(e){
        setEquipEditFormVisibility(true);
        setEquipEditSelectedModel(e, "SerialNumber");
    }

    function tableButtonClick(buttonType, e){  
        switch (buttonType) {
            case 'editButtonClick': editButtonClick(e)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <FormEquipEdit 
                visible={equipEditFormVisibility}
                hideWindow={() => {setEquipEditFormVisibility(false)}}
                updateData={updateAfterEquipEdit}
                editEquipment={equipEditSelectedModel}
                propUpdated={()=>{}}>
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
                                        buttonClick={tableButtonClick}
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