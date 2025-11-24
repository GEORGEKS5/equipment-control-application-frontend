import TableActionButton from "@/helpers/tableActionButton";
import TableColumnHeader from "@/helpers/tableColumnHeader";
import {DataTable} from '@/helpers/types/index';
import { TableButton, TableHeaderCell } from '@/helpers/classes/index';
import { ref, Ref } from "vue";

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

    const employeeTable: Ref<DataTable> = ref(defaultEmployeeTable);
    const directorTable: Ref<DataTable> = ref(defaultDirectorTable);
    const hrManagerTable: Ref<DataTable> = ref(defaultHrManagerTable);

    const prepareEmployeeTableHeader = function(){
        employeeTable.value.header.push({name: 'EmployeeLastName', localName: 'Фамилия', filterable: true});
        employeeTable.value.header.push({name: 'EmployeeName',localName: 'Имя'});
        employeeTable.value.header.push({name: 'EmployeeSurName',localName: 'Отчество'});
        employeeTable.value.header.push({name: 'Active',localName: 'Активен', filterable: true});
    };
    const prepareEmployeeTableButtonSet = function(){
        employeeTable.value.button.push(new TableButton('UserName','showAppointmentDirectorConfirmForm', 'Директор'));
        employeeTable.value.button.push(new TableButton('UserName','showAppointmentHrManagerConfirmForm', 'HR'));
        employeeTable.value.button.push(new TableButton('UserName','editEmployee', 'Редактировать'));
    };
    
    const prepareDirectorTableHeader = function(){
        directorTable.value.header.push(new TableHeaderCell('EmployeeLastName','Фамилия', true));
        directorTable.value.header.push(new TableHeaderCell('EmployeeName','Имя'));
        directorTable.value.header.push(new TableHeaderCell('EmployeeSurName','Отчество'));
        directorTable.value.header.push(new TableHeaderCell('DirectorAppointmentDate','Дата назначения', true));
    };
    const prepareDirectorTableButtonSet = function(){};
    
    const prepareHrManagerTableHeader = function(){
        hrManagerTable.value.header.push(new TableHeaderCell('EmployeeLastName','Фамилия', true));
        hrManagerTable.value.header.push(new TableHeaderCell('EmployeeName','Имя'));
        hrManagerTable.value.header.push(new TableHeaderCell('EmployeeSurName','Отчество'));
        hrManagerTable.value.header.push(new TableHeaderCell('HRActiveAppointment','Активен', true));
        hrManagerTable.value.header.push(new TableHeaderCell('HRAppointmentDate','Дата назначения', true));
    };
    const prepareHrManagerTableButtonSet = function(){
        hrManagerTable.value.button.push(new TableButton('UserName','unActualizeHrManager', 'Del'));
    };

    prepareEmployeeTableHeader();
    prepareEmployeeTableButtonSet();

    prepareDirectorTableHeader();
    prepareHrManagerTableHeader();
    prepareHrManagerTableButtonSet();

    return{
        employeeTable,
        directorTable,
        hrManagerTable,
    }
}