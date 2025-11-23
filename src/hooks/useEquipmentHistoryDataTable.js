import TableColumnHeader from "../helpers/tableColumnHeader";
import { useEffect, useState } from "react";

export default function(formVisible){
    const [tableHeader, setTableHeader] = useState([]);

    const createEquipmentTableStructure = function(){
        if(formVisible){
            let fixationDateColumn = new TableColumnHeader('FixationDate', 'Дата Назначения');
            let employeeNameColumn = new TableColumnHeader('EmployeeName', 'Имя');
            let employeeLastNameColumn = new TableColumnHeader('EmployeeLastName', 'Фамилия');
            let objectNameColumn = new TableColumnHeader('ObjectName', 'Название объекта');

            setTableHeader([fixationDateColumn, employeeLastNameColumn, employeeNameColumn, objectNameColumn])
        }
    };

    const clearTableHeader = function() {
        setTableHeader([])
    };

    useEffect(() =>{
        if(formVisible){
            createEquipmentTableStructure();
        }
    }, [formVisible])

    return{
        tableHeader,
        clearTableHeader,
    }
}