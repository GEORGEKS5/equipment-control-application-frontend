import { Dispatch, SetStateAction, useState } from "react";
import { TableButton, TableHeaderCell } from "../../helpers/classes";
import { buttonSet, DataTable } from "../../helpers/types";

export default function(){    
    const defaultEmployeeTable: DataTable = {
        button: [],
        header: [],
    };

    const [appointedEmployeeTable, setAppointedEmployeeTable]: [DataTable, Dispatch<SetStateAction<DataTable>>] = useState({...defaultEmployeeTable});    

    const [appointReadyEmployeeTable, setAppointReadyEmployeeTable]: [DataTable, Dispatch<SetStateAction<DataTable>>] = useState({...defaultEmployeeTable}); 

    const createAppointReadyEmployeeTableHeader = function(){
        setAppointReadyEmployeeTable(v => {
            return {...v, header: [
                new TableHeaderCell('EmployeeLastName', 'LName', true),
                new TableHeaderCell('EmployeeName', 'Name'),
                new TableHeaderCell('EmployeeSurName', 'SurName'),
            ]}
        });
    };

    const createAppointedEmployeeTableHeader = function(){;
        setAppointedEmployeeTable(function (v: DataTable): DataTable{
            const nv = {...v, header: [
                new TableHeaderCell('EmployeeLastName', 'LName', true),
                new TableHeaderCell('EmployeeName', 'Name'),
                new TableHeaderCell('EmployeeSurName', 'SurName'),
                new TableHeaderCell('DepartmentName', 'Dep', true),
                new TableHeaderCell('PositionName', 'Pos', true),
                new TableHeaderCell('Active', 'Act', true),
            ]};

            return nv;
        });
    };

    const createAppointReadyEmployeeTableButtonSet = function(){
        setAppointReadyEmployeeTable(v => {
            return {...v, button: [
                new TableButton('UserName','showEmployeeAppointForm', 'Appoint'),
                new TableButton('UserName', 'showRegisteredEmployeeEditForm', 'Edit'),
                new TableButton('UserName', 'showAddressEditForm', 'Adr'),
            ]}
        });
    };
    
    const createAppointedEmployeeTableButtonSet = function(){
        setAppointedEmployeeTable((v) => {
            return {...v, button: [
                new TableButton('UserName','showEmployeeDismissForm','Fire'),
                new TableButton('UserName', 'showEmployeeReAppointForm', 'ReApp'),
                new TableButton('UserName', 'showAddressDisplayForm', 'Addr'),
            ]};
        });
    }; 

    function createAppointReadyEmployeeTable(){
        createAppointReadyEmployeeTableButtonSet();
        createAppointReadyEmployeeTableHeader();
    };
    function createAppointedEmployeeTable(){
        createAppointedEmployeeTableButtonSet();
        createAppointedEmployeeTableHeader();
    };

    return{ 
        appointedEmployeeTable,
        appointReadyEmployeeTable,
        createAppointReadyEmployeeTable,
        createAppointedEmployeeTable,
    }
}