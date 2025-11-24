import { onBeforeUpdate, ref } from "vue";
import TableColumnHeader from "@/helpers/tableColumnHeader";
import TableActionButton from "@/helpers/tableActionButton";
import { TableButton, TableHeaderCell } from "@/helpers/classes";

export default function(isFormVisible){
    const tableHeader = ref([]);
    const tableActionButton = ref([]);

    const createEmployeeTableStructure = function(){
        if(isFormVisible.value){
            let userNameColumn = new TableHeaderCell('UserName', 'Имя пользователя');
            let employeeLastNameColumn = new TableHeaderCell('EmployeeLastName', 'Фамилия');
            let employeeNameColumn = new TableHeaderCell('EmployeeName', 'Имя');
            let positionNameColumn = new TableHeaderCell('PositionName', 'Должность');
        
            tableHeader.value.push(userNameColumn);
            tableHeader.value.push(employeeLastNameColumn);
            tableHeader.value.push(employeeNameColumn);
            tableHeader.value.push(positionNameColumn);
        
            tableActionButton.value.push(new TableButton('UserName', 'selectEmployee', 'Выбор'));
        }
    };

    const clearTableHeader = function() {
        tableHeader.value = [];
        tableActionButton.value = [];
        console.log('Table Header Cleared')
    };

    onBeforeUpdate(createEmployeeTableStructure)

    return{
        tableHeader,
        tableActionButton,
        clearTableHeader,
    }
}