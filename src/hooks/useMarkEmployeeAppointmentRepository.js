import { useEffect, useMemo } from 'react';
import markData from '../helpers/markData';

export default function(departmentRepository = [], positionRepository = [], reAppointEmployee, appointmentRequestModel){
    const appointDepartmentObject = useMemo(()=>{
        const currentDepartment = departmentRepository?.find(val => val['DepartmentName'] == reAppointEmployee['DepartmentName']);

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

    useEffect(() => {
        let {Name} = appointmentRequestModel.department;
        Name = Name ? Name : appointDepartmentObject.Name;

        markData(departmentRepository, Name, 'DepartmentName');
    }, [departmentRepository]);

    const appointPositionObject = useMemo(() => {
        const currentPosition = positionRepository?.find(val => val['PositionName'] == reAppointEmployee['PositionName']);

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

    useEffect(() =>{
        const reAppointEmployeeObjectSize = Object.keys(reAppointEmployee).length;

        if(!reAppointEmployeeObjectSize){
            markData(positionRepository, appointmentRequestModel.position.Id, 'PositionID');
        }
    }, [appointmentRequestModel.position.Id]);

    useEffect(() => {
        let {Id} = appointmentRequestModel.position;
        Id = Id ? Id : appointPositionObject.Id;

        if(Id){
            markData(positionRepository, Id, 'PositionID');
        }
    }, [positionRepository]);

    return{
        appointmentRequestModel,
        appointPositionObject,
        appointDepartmentObject,
    }
}