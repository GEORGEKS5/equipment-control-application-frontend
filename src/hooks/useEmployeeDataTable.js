import { TableButton, TableHeaderCell } from "../helpers/classes";
import { useState, useEffect } from "react";

export default function(isFormVisible){
    const [tableHeader, setTableHeader] = useState([]);
    const [tableActionButton, setTableActionButton] = useState([]);

    const createEmployeeTableStructure = function(){
        if(isFormVisible){
            let userNameColumn = new TableHeaderCell('UserName', 'Имя пользователя');
            let employeeLastNameColumn = new TableHeaderCell('EmployeeLastName', 'Фамилия');
            let employeeNameColumn = new TableHeaderCell('EmployeeName', 'Имя');
            let positionNameColumn = new TableHeaderCell('PositionName', 'Должность');

            setTableHeader([ userNameColumn, employeeLastNameColumn, employeeNameColumn, positionNameColumn ]);
        
            setTableActionButton([new TableButton('UserName', 'selectEmployee', 'Выбор')]);
        }
    };

    const clearTableHeader = function() {
        setTableHeader([]);
        setTableActionButton([]);
    };

    useEffect(() => {
        if(isFormVisible){
            createEmployeeTableStructure();
        }
    }, [isFormVisible])

    return{
        tableHeader,
        tableActionButton,
        clearTableHeader,
    }
}