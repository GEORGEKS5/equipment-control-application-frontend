import { useEffect, useState } from "react";

export default function(appointedEmployeesInitialRepository, appointmentReadyEmployeesInitialRepository){
    const [filterAppointedEmployee, setFilterAppointedEmployee] = useState([]);
    const [filterAppointReadyEmployee, setFilterAppointReadyEmployee] = useState([]);

    useEffect(()=>{
        if(appointmentReadyEmployeesInitialRepository.length){
            setFilterAppointReadyEmployee([...appointmentReadyEmployeesInitialRepository]);
        }
    }, [appointmentReadyEmployeesInitialRepository]);

    useEffect(()=>{
        if(appointedEmployeesInitialRepository.length){
            setFilterAppointedEmployee([...appointedEmployeesInitialRepository]);
        }
    }, [appointedEmployeesInitialRepository]) 

    return{
        filterAppointReadyEmployee,
        filterAppointedEmployee,
        setFilterAppointedEmployee,
        setFilterAppointReadyEmployee,

    }
}