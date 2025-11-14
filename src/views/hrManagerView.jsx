import HeaderBlock from "../components/headerBlock";
import DataTable from "../components/table/dataTable.jsx";
import DataOrderForm from "../components/dataOrderForm.jsx";

import ContentSingleBlock from "../layouts/contentBlock";
import ContentBlockSection from "../layouts/contentBlockSection";
import ContentSection from "../layouts/contentSection";
import ContentSectionFooter from "../layouts/slots/contentSectionFooter.jsx";

import useFullEmployeeRepository from '../hooks/hrmanager/useFullEmployeeRepository.js';
import useHRManagerViewDataTable from "../hooks/hrmanager/useHRManagerViewDataTable";
import useHRManagerFormModel from "../hooks/hrmanager/useHRManagerFormModel";
import useFilterEmployeeModel from '../hooks/hrmanager/useFilterEmployeeModel.js';

import { FilterForm } from "../helpers/classes";
import { useEffect } from "react";

function HRManagerView(){
    const {appointReadyEmployeeTable, appointedEmployeeTable, createAppointReadyEmployeeTable, createAppointedEmployeeTable} = useHRManagerViewDataTable();
    const {appointedEmployeesInitialRepository, appointmentReadyEmployeesInitialRepository, getAppointedEmployeeRepository, getAppointmentReadyEmployeeRepository} = useFullEmployeeRepository();
    const {filterAppointReadyEmployee, filterAppointedEmployee} = useFilterEmployeeModel(appointedEmployeesInitialRepository, appointmentReadyEmployeesInitialRepository);

    useEffect(()=>{
        createAppointReadyEmployeeTable();
        createAppointedEmployeeTable();

        getAppointedEmployeeRepository().then(val => {
            return getAppointmentReadyEmployeeRepository();
        });

    }, []);

    return (
        <>
            <HeaderBlock />
            <h1>HR manager view</h1>
        </>
    )
}

export default HRManagerView;