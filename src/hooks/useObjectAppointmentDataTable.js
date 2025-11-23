import { useState, useEffect } from "react";
import TableColumnHeader from "../helpers/tableColumnHeader";

export default function(isFormVisible){
    const [tableHeader, setTableHeader] = useState([]);

    const createEmployeeTableStructure = function(){
        if(isFormVisible){
            let userNameColumn = new TableColumnHeader('AppointmentDate', 'Дата Назначения');
            let employeeLastNameColumn = new TableColumnHeader('EmployeeLastName', 'Фамилия');
            let employeeNameColumn = new TableColumnHeader('EmployeeName', 'Имя');

            setTableHeader([userNameColumn, employeeLastNameColumn, employeeNameColumn])
        }
    };

    const clearTableHeader = function() {
        setTableHeader([]);
    };

    useEffect(() =>{
        if(isFormVisible){
            createEmployeeTableStructure();
        }
    }, [isFormVisible])

    return{
        tableHeader,
        clearTableHeader,
    }
}