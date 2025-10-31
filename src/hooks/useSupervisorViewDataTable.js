import { useEffect, useState } from "react";
import { TableButton, TableHeaderCell } from "../helpers/classes";
import { mdiClipboardCheckOutline, mdiClipboardEditOutline } from "@mdi/js";

export default function(){
    const [pinReadyEquipmentTable, setPinReadyEquipmentTable] = useState({
        button: [],
        header: [],
    });
    const [supervisorPinedEquipmentTable, setSupervisorPinedEquipmentTable] = useState({
        button: [],
        header: [],
    });
    
    const createPinReadyEquipmentTable = function(){
        const pinReadyEquipmentTableTemp = {button: [], header: []};

        pinReadyEquipmentTableTemp.header.push(new TableHeaderCell("CategoryName", "Категория", true));
        pinReadyEquipmentTableTemp.header.push(new TableHeaderCell("BrandName", "Производитель", true));
        pinReadyEquipmentTableTemp.header.push(new TableHeaderCell("ModelName", "Модель", true));
        pinReadyEquipmentTableTemp.header.push(new TableHeaderCell("SerialNumber", "Серийный номер"));

        pinReadyEquipmentTableTemp.button.push(new TableButton("SerialNumber","pinButtonClick","Pin", mdiClipboardCheckOutline))
        pinReadyEquipmentTableTemp.button.push(new TableButton("SerialNumber","editButtonClick","Edit", mdiClipboardEditOutline))

        setPinReadyEquipmentTable(pinReadyEquipmentTableTemp);

    };
    const createSupervisorPinedEquipmentTableHeader = function(){
        const supervisorPinedEquipmentTableTemp = {button: [], header: []};

        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("FixationDate", "Дата закрепления"));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("EmployeeLastName", "Фамилия"));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("EmployeeName", "Имя"));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("EmployeeSurName", "Отчество"));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("CategoryName", "Категория", true));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("BrandName", "Производитель", true));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("ModelName", "Модель", true));
        supervisorPinedEquipmentTableTemp.header.push(new TableHeaderCell("SerialNumber", "Серийный номер"));

        setSupervisorPinedEquipmentTable(supervisorPinedEquipmentTableTemp);
    };

    useEffect(()=>{
            createPinReadyEquipmentTable();
            createSupervisorPinedEquipmentTableHeader();
    }, [])

    return{
        pinReadyEquipmentTable,
        supervisorPinedEquipmentTable,
    }
}