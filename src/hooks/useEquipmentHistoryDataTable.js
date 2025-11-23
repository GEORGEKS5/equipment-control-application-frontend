import TableColumnHeader from "@/helpers/tableColumnHeader";
import { ref, watch } from "vue"

export default function(formVisible){
    const tableHeader = ref([]);

    const createEquipmentTableStructure = function(){
        if(formVisible.value){
            let fixationDateColumn = new TableColumnHeader('FixationDate', 'Дата Назначения');
            let employeeNameColumn = new TableColumnHeader('EmployeeName', 'Имя');
            let employeeLastNameColumn = new TableColumnHeader('EmployeeLastName', 'Фамилия');
            let objectNameColumn = new TableColumnHeader('ObjectName', 'Название объекта');
        
            tableHeader.value.push(fixationDateColumn); 
            tableHeader.value.push(employeeLastNameColumn);
            tableHeader.value.push(employeeNameColumn);
            tableHeader.value.push(objectNameColumn); 
    
            console.log('Table Header Created')
        }
    };

    const clearTableHeader = function() {
        tableHeader.value = [];
        console.log('Table Header Cleared')
    };

    watch(formVisible, (n,o) =>{
        if(n){
            console.log(tableHeader.value);
            createEquipmentTableStructure();
        }
    })

    return{
        tableHeader,
        clearTableHeader,
    }
}