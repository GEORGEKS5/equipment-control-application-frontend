import ContentBlock from '../layouts/contentBlock';
import ContentBlockSection from '../layouts/contentBlockSection';
import ContentBlockSplitSection from '../layouts/contentBlockSplitSection';
import ContentSection from '../layouts/contentSection';
import ContentSplitSection from '../layouts/contentSplitSection';

import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import SectionHeader from '../layouts/slots/sectionHeader';
import SectionData from "../layouts/slots/sectionData";
import SectionFooter from '../layouts/slots/sectionFooter';
import ContentSectionFooter from "../layouts/slots/contentSectionFooter";

import HeaderBlock from '../components/headerBlock';
import DataOrderForm from "../components/dataOrderForm";
import DataTable from "../components/table/dataTable";

import useSuUserViewDataTable from "../hooks/superuser/useSuUserViewDataTable";
import useSuUserRepository from "../hooks/superuser/useSuUserRepository";
import useSuUserFilterRepository from '../hooks/superuser/useSuUserFilterRepository';
import useSuUserFormModel from '../hooks/superuser/useSuUserFormModel';

import { FilterForm } from '../helpers/classes';
import { useEffect } from 'react';

function SuperUserView(){
    const {equipmentTable, constructiveObjectTable, actualObjectSupervisorTable} = useSuUserViewDataTable();
    const {constructiveObjectCreationForm, supervisorAppointmentForm, objectUnactualizeConfirmForm, objectAppointmentHistoryForm, equipmentFixationHistoryForm, equipmentFixationSupervisorDetailForm, filterPinedEquipmentFormController, filterConstructiveObjectFormController} = useSuUserFormModel();
    const {constructiveObjectInitialRepository, pinedEquipmentInitialRepository, actualObjectSupervisorInitialRepository, getActualObjectSupervisorInitialRepository, getPinedEquipmentInitialRepository, getConstructiveObjectInitialRepository, getAllRepos,} = useSuUserRepository();
    const {constructiveObjectFilterRepository, 
            pinedEquipmentFilterRepository, 
            actualObjectSupervisorFilterRepository, 
            setConstructiveObjectFilterRepository, 
            setPinedEquipmentFilterRepository, 
            setActualObjectSupervisorFilterRepository,
        } = useSuUserFilterRepository(constructiveObjectInitialRepository, pinedEquipmentInitialRepository, actualObjectSupervisorInitialRepository);

    useEffect(()=>{
        getAllRepos();
    }, []);

    function setFilteredPinedEquipmentModel(model){
        setPinedEquipmentFilterRepository(model);
        filterPinedEquipmentFormController.activeForm.hide();
    }

    function setConstructiveObjectEquipmentModel(model){
        setConstructiveObjectFilterRepository(model);
        filterConstructiveObjectFormController.activeForm.hide();
    }

    async function objectUnactualizeConfirmed(){
        await getConstructiveObjectInitialRepository();
        await getActualObjectSupervisorInitialRepository();

        objectUnactualizeConfirmForm.hide();
    }

    async function supervisorAppointed(){
        await getConstructiveObjectInitialRepository();
        await getActualObjectSupervisorInitialRepository();
        
        supervisorAppointmentForm.hide();
    }

    function updateAfterObjectCreation(){
        getConstructiveObjectInitialRepository();
        constructiveObjectCreationForm.hide();
    }

    function pinedEquipmentTableButtonClick(clickType, e) {
        switch(clickType){
            case "showEquipmentFixationHistoryForm": e => equipmentFixationHistoryForm.show(e); break;
            case "showEquipmentFixationSupervisorDetailForm": e => equipmentFixationSupervisorDetailForm.show(e); break;
        }
    }

    function constructiveObjectTableButtonClick(clickType, e) {
        switch(clickType){
            case "showSupervisorAppointmentForm": e => supervisorAppointmentForm.show(e); break;
            case "showObjectUnactualizeConfirmForm": e => objectUnactualizeConfirmForm.show(e); break;
            case "showObjectAppointmentHistoryForm": e => objectAppointmentHistoryForm.show(e); break;
        }
    }

    return (
        <>
            <DataOrderForm
                originFilterObject={pinedEquipmentInitialRepository}
                originSortObject={pinedEquipmentFilterRepository}
                orderCategory={filterPinedEquipmentFormController.activeForm.filterCategory}
                formVisible={filterPinedEquipmentFormController.activeForm.visible}
                clientRect={FilterForm.absoluteFormClientRect}
                elementOrdered={setFilteredPinedEquipmentModel}
                hideForm={() => {filterPinedEquipmentFormController.activeForm.hide()}}>
            </DataOrderForm>

            <DataOrderForm
                originFilterObject={constructiveObjectInitialRepository}
                originSortObject={constructiveObjectFilterRepository}
                orderCategory={filterConstructiveObjectFormController.activeForm.filterCategory}
                formVisible={filterConstructiveObjectFormController.activeForm.visible}
                clientRect={FilterForm.absoluteFormClientRect}
                elementOrdered={setConstructiveObjectEquipmentModel}
                hideForm={() => {filterConstructiveObjectFormController.activeForm.hide()}}>
            </DataOrderForm>

            <div id="rootEl" className="flexParent">
                <HeaderBlock />
                <ContentBlock>
                    <MainContent>
                        <ContentBlockSection>
                            <ContentSection>
                                <SectionHeader>
                                     <h3>Техника</h3>
                                </SectionHeader>
                                <SectionData>
                                    <DataTable 
                                        tableData={pinedEquipmentFilterRepository}
                                        tableStructure={equipmentTable.header}
                                        tableActionButton={equipmentTable.button}
                                        tdSizeClass="xs"
                                        filterButtonClick= {e => filterPinedEquipmentFormController.showActiveForm(e)}
                                        buttonClick={pinedEquipmentTableButtonClick}>
                                    </DataTable>
                                </SectionData>
                            </ContentSection>
                        </ContentBlockSection>
                    </MainContent>
                    <SideBar>
                        <ContentBlockSplitSection>
                            <SectionHeader>
                                <ContentSplitSection>
                                    <SectionHeader>
                                        <h3>Начальник участка</h3>
                                    </SectionHeader>
                                    <SectionData>
                                        <DataTable 
                                            tableData={actualObjectSupervisorInitialRepository}
                                            tableStructure={actualObjectSupervisorTable.header}
                                            tdSizeClass="lg">
                                        </DataTable>
                                    </SectionData>
                                </ContentSplitSection>
                            </SectionHeader>
                            <SectionFooter>
                                <ContentSplitSection>
                                    <SectionHeader>
                                        <h3>Объект</h3>
                                    </SectionHeader>
                                    <SectionData>
                                        <DataTable 
                                            tableData={constructiveObjectFilterRepository}
                                            tableStructure={constructiveObjectTable.header}
                                            tableActionButton={constructiveObjectTable.button}
                                            tdSizeClass="lg"
                                            buttonClick={constructiveObjectTableButtonClick}
                                            filterButtonClick={e => filterConstructiveObjectFormController.showActiveForm(e)}>
                                        </DataTable>
                                    </SectionData>
                                    <SectionFooter>
                                        <ContentSectionFooter
                                            buttonCaption="New"
                                            buttonClick={() => {constructiveObjectCreationForm.show()}}>
                                        </ContentSectionFooter>
                                    </SectionFooter>
                                </ContentSplitSection>
                            </SectionFooter>
                        </ContentBlockSplitSection>
                    </SideBar>
                    <template v-slot:sideBar>
                        <ContentBlockSplitSection>

                            <template v-slot:lowerSection>
                                <ContentSplitSection>
                                    <template v-slot:sectionHeader>

                                    </template>
                                    <template v-slot:sectionData>

                                    </template>
                                    <template v-slot:sectionFooter>

                                    </template>
                                </ContentSplitSection>
                            </template>
                        </ContentBlockSplitSection>
                    </template>
                </ContentBlock>
            </div>
        </>
    )
}

export default SuperUserView;