import { useEffect } from "react";

export default function(formVisible, getDepartmentRepo, getPositionRepo, positionRepository, appointDepartmentObject, appointPositionObject, appointmentRequestModel, departmentRepository, setAppointmentRequestModel, setPositionRepository, setDepartmentRepository){
    useEffect(() => {
        if(formVisible){
            getDepartmentRepo().then(r => {
                setAppointmentRequestModel({...appointmentRequestModel, department: appointDepartmentObject});
                return  getPositionRepo();
            });
            //appointmentRequestModel.value.position = appointPositionObject.value
        }else{
            setAppointmentRequestModel({
                department: {
                    Id: '',
                    Name: '',
                },
                position: {
                    Id: '',
                    Name: '',
                }
            });

            setPositionRepository([]);
            setDepartmentRepository([]);
        }
    }, [formVisible])
    
    return {
       
    }
}