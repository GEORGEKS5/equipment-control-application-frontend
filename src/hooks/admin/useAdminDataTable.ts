import { DataTable } from '../../helpers/types/index';
import { TableButton, TableHeaderCell } from '../../helpers/classes/index';
import { useState, useEffect} from "react";

export default function(){
    const defaultEmployeeTable: DataTable = {
        button: [],
        header: [],
    }; 

    const defaultDirectorTable: DataTable = {
        button: [],
        header: [],
    }; 

    const defaultHrManagerTable: DataTable = {
        button: [],
        header: [],
    }; 

    const [employeeTable, setEmployeeTable] = useState(defaultEmployeeTable);
    const [directorTable, setDirectorTable] = useState(defaultDirectorTable);
    const [hrManagerTable, setHrManagerTable] = useState(defaultHrManagerTable);

    const prepareEmployeeTableHeader = function(){
        setEmployeeTable(prevVal => {
            return {
                button: [...prevVal.button],
                header: [
                    new TableHeaderCell('EmployeeLastName', 'Фамилия', true),
                    new TableHeaderCell('EmployeeName', 'Имя'),
                    new TableHeaderCell('EmployeeSurName', 'Отчество'),
                    new TableHeaderCell('Active', 'Активен', true)
                ]
            }
        });
    };
    const prepareEmployeeTableButtonSet = function(){
        setEmployeeTable(prevVal => {
            return {
                button: [
                    new TableButton('UserName','showAppointmentDirectorConfirmForm', 'Директор'),
                    new TableButton('UserName','showAppointmentHrManagerConfirmForm', 'HR'),
                    new TableButton('UserName','editEmployee', 'Редактировать'),
                ],
                header: [ ...prevVal.header ]
            }
        });
    };
    
    const prepareDirectorTableHeader = function(){
        setDirectorTable(prevVal => {
            return {
                button: [...prevVal.button],
                header: [
                    new TableHeaderCell('EmployeeLastName','Фамилия', true),
                    new TableHeaderCell('EmployeeName','Имя'),
                    new TableHeaderCell('EmployeeSurName','Отчество'),
                    new TableHeaderCell('DirectorAppointmentDate','Дата назначения', true)
                ]
            }
        });
    };
    const prepareDirectorTableButtonSet = function(){};
    
    const prepareHrManagerTableHeader = function(){
        setHrManagerTable(prevVal => {
            return {
                button: [...prevVal.button],
                header: [
                    new TableHeaderCell('EmployeeLastName','Фамилия', true),
                    new TableHeaderCell('EmployeeName','Имя'),
                    new TableHeaderCell('EmployeeSurName','Отчество'),
                    new TableHeaderCell('HRActiveAppointment','Активен', true),
                    new TableHeaderCell('HRAppointmentDate','Дата назначения', true)
                ]
            }
        });
    };
    const prepareHrManagerTableButtonSet = function(){
        setHrManagerTable(prevVal => {
            return {
                button: [
                    new TableButton('UserName','unActualizeHrManager', 'Del')
                ],
                header: [ ...prevVal.header ]
            }
        });
    };

    useEffect(() => {
        prepareEmployeeTableHeader();
        prepareEmployeeTableButtonSet();

        prepareDirectorTableHeader();
        prepareHrManagerTableHeader();
        prepareHrManagerTableButtonSet();
    }, [])

    return{
        employeeTable,
        directorTable,
        hrManagerTable,
    }
}