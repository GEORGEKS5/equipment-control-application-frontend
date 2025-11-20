import { useContext, useState } from "react";
import getRequestPromise from "../helpers/lib";
import UserContext from "../context/user";

export default function(){
    const [positionRepository, setPositionRepository] = useState({});
    const [departmentRepository, setDepartmentRepository] = useState({});

    const {USER_STATE} = useContext(UserContext);
    
    const getPositionRepo = async function(v){
        const servAdr = USER_STATE.getServerUrlAddress();
        const endPoint = 'GetPosition';

        const requestPromise = await getRequestPromise(servAdr, endPoint);
        const jsonResponse = await requestPromise.json();

        setPositionRepository(jsonResponse);
    };

    const getDepartmentRepo = async function(v){
        const servAdr = USER_STATE.getServerUrlAddress();
        const endPoint = 'GetDepartment';

        const reqPromise = await getRequestPromise(servAdr, endPoint, {});
        const respObject = await reqPromise.json();

        setDepartmentRepository(respObject);
    };

    return{
        positionRepository,
        departmentRepository,
        getPositionRepo,
        getDepartmentRepo,
        setPositionRepository,
        setDepartmentRepository,
    }
}