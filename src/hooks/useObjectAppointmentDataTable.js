import { onBeforeUpdate, ref, watch } from "vue";
import TableColumnHeader from "@/helpers/tableColumnHeader";

export default function(isFormVisible){
    const tableHeader = ref([]);

    const createEmployeeTableStructure = function(){
        if(isFormVisible.value){
            let userNameColumn = new TableColumnHeader('AppointmentDate', 'Дата Назначения');
            let employeeLastNameColumn = new TableColumnHeader('EmployeeLastName', 'Фамилия');
            let employeeNameColumn = new TableColumnHeader('EmployeeName', 'Имя');
        
            tableHeader.value.push(userNameColumn);
            tableHeader.value.push(employeeLastNameColumn);
            tableHeader.value.push(employeeNameColumn);
    
            console.log('Table Header Created')
        }
    };

    const clearTableHeader = function() {
        tableHeader.value = [];
        console.log('Table Header Cleared')
    };

    watch(isFormVisible, (n,o) =>{
        if(n){
            createEmployeeTableStructure();
        }
    })

    return{
        tableHeader,
        clearTableHeader,
    }
}