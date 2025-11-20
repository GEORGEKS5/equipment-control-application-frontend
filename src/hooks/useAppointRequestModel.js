import { ref, watch } from "vue";

export default function(formVisible, getDepartmentRepo, getPositionRepo, positionRepository, appointDepartmentObject, appointPositionObject, appointmentRequestModel, departmentRepository){
    watch(formVisible, async (n, o) => {
        if(n){
            await getDepartmentRepo();
            appointmentRequestModel.value.department = appointDepartmentObject.value;
            await getPositionRepo();
            //appointmentRequestModel.value.position = appointPositionObject.value
        }else{
            appointmentRequestModel.value.department = {
                Id: '',
                Name: '',
            };

            appointmentRequestModel.value.position = {
                Id: '',
                Name: '',
            }

            positionRepository.value = [];
            departmentRepository.value = [];
        }
    })
    
    return {
       
    }
}