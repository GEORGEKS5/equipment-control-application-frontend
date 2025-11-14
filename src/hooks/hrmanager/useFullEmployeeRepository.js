import getRequestPromise from '../../helpers/lib';
import { useContext, useState } from 'react';
import UserContext from '../../context/user';

export default function(){
    const [appointmentReadyEmployeesInitialRepository, setAppointmentReadyEmployeesInitialRepository] = useState([]);
    const [appointedEmployeesInitialRepository, setAppointedEmployeesInitialRepository] = useState([]);

    const {USER_STATE} = useContext(UserContext);

    const servUrlAddr = USER_STATE.getServerUrlAddress();

    const getAppointmentReadyEmployeeRepository = async function(){
        const endPoint = 'GetAppointReadyEmployeeList';
  
        const requestResultPromise = await getRequestPromise(servUrlAddr, endPoint, {});
        const requestResultObject = await requestResultPromise.json();

        setAppointmentReadyEmployeesInitialRepository(requestResultObject);
    };

    const getAppointedEmployeeRepository = async function(){
        const requestAppointedEmployeesEndpoint = 'GetEmployeeList';

        const requestAppointedEmployeesPromise = await getRequestPromise(servUrlAddr, requestAppointedEmployeesEndpoint, {});
        const requestAppointedEmployeesObject = await requestAppointedEmployeesPromise.json();

        setAppointedEmployeesInitialRepository(requestAppointedEmployeesObject);
    };

    const getEmployeeRepository = async function(){
        await getAppointedEmployeeRepository();
        await getAppointmentReadyEmployeeRepository();
    };

    return{
        appointedEmployeesInitialRepository,
        appointmentReadyEmployeesInitialRepository,
        getAppointmentReadyEmployeeRepository,
        getAppointedEmployeeRepository,
    }
}