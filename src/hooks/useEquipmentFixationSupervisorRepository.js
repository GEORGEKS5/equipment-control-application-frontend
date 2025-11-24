import getRequestPromise from '../helpers/lib'
import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';

export default function(formVisible, activeFixationSupervisor){
    const [supervisorRepository, setSupervisorRepository] = useState([]);
    const {USER_STATE} = useContext(UserContext);

    const getFixationSupervisor = async function(){
        if(formVisible){
            const servAdr = USER_STATE.getServerUrlAddress();
            const endPoint = 'GetSupervisorDetail';
            const reqBody = { 'UserName': activeFixationSupervisor}

            //setSupervisorRepository([]);

            const reqProm = await getRequestPromise(servAdr, endPoint, reqBody);
            const reqResult = await reqProm.json();

            setSupervisorRepository(reqResult[0]);
        }
    }

    useEffect(() => {
        if(formVisible){
            getFixationSupervisor();
        }
    }, [formVisible]);

    return {
        supervisorRepository,
    }
}