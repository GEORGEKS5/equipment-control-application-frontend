import { TableButton, TableHeaderCell } from "../../helpers/classes";
import { DataTable } from "../../helpers/types";
import {mdiAccountTieVoiceOutline  } from '@mdi/js';
import {mdiArchiveArrowDownOutline  } from '@mdi/js';
import {mdiHistory} from '@mdi/js';


export default function(){
    const equipmentTable: DataTable = {
        button: [],
        header: [],
    };

    const constructiveObjectTable: DataTable = {
        button: [],
        header: [],
    };

    const actualObjectSupervisorTable: DataTable = {
        button: [],
        header: [],
    };

    const createEquipmentTableHeader = function(){
        equipmentTable.header.push(new TableHeaderCell('FixationDate', 'Дата', true));
        equipmentTable.header.push(new TableHeaderCell('EmployeeName', 'Имя'));
        equipmentTable.header.push(new TableHeaderCell('EmployeeLastName', 'Фамилия'));
        equipmentTable.header.push(new TableHeaderCell('CategoryName', 'Категория', true));
        equipmentTable.header.push(new TableHeaderCell('BrandName','Производитель', true));
        equipmentTable.header.push(new TableHeaderCell('ModelName','Модель', true));
        equipmentTable.header.push(new TableHeaderCell('SerialNumber','Серийный номер'));
        equipmentTable.header.push(new TableHeaderCell('ObjectName','Объект', true));
    };

    const createConstructiveObjectTableHeader = function(){
        constructiveObjectTable.header.push(new TableHeaderCell('ObjectName', 'Название'));
        constructiveObjectTable.header.push(new TableHeaderCell('ObjectIsActual', 'Актуальность',true));
    };

    const createActualObjectSupervisorTableHeader = function(){
        actualObjectSupervisorTable.header.push(new TableHeaderCell('ObjectName','Название'));
        actualObjectSupervisorTable.header.push(new TableHeaderCell('AppointmentDate','Дата назначания'));
        actualObjectSupervisorTable.header.push(new TableHeaderCell('EmployeeName', 'Имя'));
        actualObjectSupervisorTable.header.push(new TableHeaderCell('EmployeeLastName', 'Фамилия'));
        actualObjectSupervisorTable.header.push(new TableHeaderCell('EmployeeSurName', 'Отчество'));
    };

    const createEquipmentTableButtonSet = function(){
        equipmentTable.button.push(new TableButton('SupervisorUsername','showEquipmentFixationSupervisorDetailForm','Appoint', mdiAccountTieVoiceOutline));
        equipmentTable.button.push(new TableButton('SerialNumber','showEquipmentFixationHistoryForm','Archivate', mdiHistory));
    };

    const createConstructiveObjectTableButtonSet = function(){
        constructiveObjectTable.button.push(new TableButton('ObjectID','showSupervisorAppointmentForm','Appoint', mdiAccountTieVoiceOutline));
        constructiveObjectTable.button.push(new TableButton('ObjectID','showObjectUnactualizeConfirmForm','Archivate', mdiArchiveArrowDownOutline));
        constructiveObjectTable.button.push(new TableButton('ObjectID','showObjectAppointmentHistoryForm','ShowHistory', mdiHistory));
    };

    const createActualObjectSupervisorTableButtonSet = function(){};

    createEquipmentTableHeader();
    createConstructiveObjectTableHeader();
    createActualObjectSupervisorTableHeader();
    createEquipmentTableButtonSet();
    createConstructiveObjectTableButtonSet();

    return{
        equipmentTable,
        constructiveObjectTable,
        actualObjectSupervisorTable,
    }
}