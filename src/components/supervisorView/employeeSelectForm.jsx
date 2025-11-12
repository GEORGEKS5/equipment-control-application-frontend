import React, { useContext, useEffect, useMemo, useState } from "react";
import DialogWindow from "../../layouts/dialogWindow";
import FormField from "../../layouts/slots/formField";
import FormFooter from "../../layouts/slots/formFooter";
import DataTable from '../table/dataTable';
import FormInput from "../UI/formInput";
import getRequestPromise from "../../helpers/lib";
import getFullDate from '../../helpers/getFullDate';
import TableActionButton from '../../helpers/tableActionButton';
import TableColumnHeader from '../../helpers/tableColumnHeader';
import { TableButton } from '../../helpers/classes';
import UserContext from "../../context/user";

function EmployeeSelectForm({formVisible, equipmentSerialNumber, hideForm, employeeSelected}) {
    const [employeesModel, setEmployeesModel] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    const [tableHeader, setTableHeader] = useState([]);
    const [tableActionButton, setTableActionButton] = useState([]);

    const {USER_STATE} = useContext(UserContext);

    const isOuterSerialNumber = useMemo(() => {
        console.log('Use Memo + ' + equipmentSerialNumber);
        return !Boolean(equipmentSerialNumber ?? '');
    }, [equipmentSerialNumber]);

    useEffect(()=>{
        if(formVisible){
            let servAddress = USER_STATE.getServerUrlAddress();
            let prmse = getRequestPromise(servAddress, 'GetEmployeeList', {});

            prmse.then(promResult=>{
                promResult.json().then(jsonResult=>{
                    setEmployeesModel(jsonResult);
                });
            });

            let userNameColumn = new TableColumnHeader('UserName', 'Имя пользователя');
            let employeeLastNameColumn = new TableColumnHeader('EmployeeLastName', 'Фамилия');
            let employeeNameColumn = new TableColumnHeader('EmployeeName', 'Имя');
            let positionNameColumn = new TableColumnHeader('PositionName', 'Должность');

            setTableHeader([userNameColumn, employeeLastNameColumn, employeeNameColumn, positionNameColumn]);

            setTableActionButton([new TableButton('UserName', 'selectEmployee', 'Выбор')]);

            console.log('Form employee select is opened (from useEffect on formVisible)');
        }
    }, [formVisible])

    function clearTableStructure(){
        setTableHeader([]);
        setTableActionButton([]);

        setSerialNumber('');
    }

    function hideWindow(){
        clearTableStructure();
        hideForm();
    }

    function selectEmployee(buttonName, event){
        console.log(event);
        let employeeValue = event.currentTarget.value;
        let servAddress = USER_STATE.getServerUrlAddress();
        
        let serialNum = serialNumber ?? equipmentSerialNumber;

        let fixObject = {
            fixDate: getFullDate(),
            userName: employeeValue,
            equipmentSerialNumber: serialNum,
            supervisorUsername: USER_STATE.userName,
        };

        console.log(fixObject);
        let prmse = getRequestPromise(servAddress, 'RegistrateFixation', fixObject);

        prmse.then(res=>{
            employeeSelected(false);

            setEmployeesModel([])
            clearTableStructure();
        });
    }

    function changeSerialNumber(value){
        setSerialNumber(value);
    }

    return (
        <DialogWindow visibleForm={formVisible} hideForm={hideWindow}>
                {
                        isOuterSerialNumber 
                    ?
                        <FormFooter>
                            <FormInput
                                inputValue={serialNumber}
                                fieldCaption="Серийный номер оборудования"
                                updateInput={changeSerialNumber}
                            >
                            </FormInput>
                        </FormFooter>
                    :
                        <></>
                }

                <FormField>
                    <DataTable
                        tableData={employeesModel}
                        tableStructure={tableHeader}
                        tableActionButton={tableActionButton}
                        tableActionButtonAmount="1"
                        buttonClick={selectEmployee}
                    >
                    </DataTable>
                </FormField>
            </DialogWindow>
    )
}

export default EmployeeSelectForm;