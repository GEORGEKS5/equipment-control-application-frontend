import { watch, ref, computed } from "vue";
import markData from '@/helpers/markData';

export default function(departmentRepository, positionRepository, reAppointEmployee, appointmentRequestModel){
    const appointDepartmentObject = computed(()=>{
        const currentDepartment = departmentRepository.value.find(val => val['DepartmentName'] == reAppointEmployee.value['DepartmentName']);
            
        if(currentDepartment){
            const departmentObject = {
                Id: currentDepartment['DepartmentID'],
                Name: currentDepartment['DepartmentName'],
            };
    
            return departmentObject
        }

        return {
            Id: '',
            Name: '',
        };
    });

    watch(departmentRepository, (n, o) => {
        let {Name} = appointmentRequestModel.value.department;
        Name = Name ? Name : appointDepartmentObject.value.Name;

        markData(departmentRepository.value, Name, 'DepartmentName');
    });

    const appointPositionObject = computed(() => {
        const currentPosition = positionRepository.value.find(val => val['PositionName'] == reAppointEmployee.value['PositionName']);

        if(currentPosition){
            const positionObject = {
                Id: currentPosition['PositionID'],
                Name: currentPosition['PositionName'],
            };
    
            return positionObject
        }

        return {
            Id: '',
            Name: '',
        };
    })

    watch(
        ()=> appointmentRequestModel.value.position.Id, 
        (n, o) =>{
            const reAppointEmployeeObjectSize = Object.keys(reAppointEmployee.value).length;
    
            if(!reAppointEmployeeObjectSize){
                markData(positionRepository.value, n, 'PositionID');
            }
        }
    );

    watch(positionRepository, (n, o) => {
        let {Id} = appointmentRequestModel.value.position;
        Id = Id ? Id : appointPositionObject.value.Id;

        if(Id){
            markData(positionRepository.value, Id, 'PositionID');
        }
    });

    return{
        appointmentRequestModel,
        appointPositionObject,
        appointDepartmentObject,
    }
}