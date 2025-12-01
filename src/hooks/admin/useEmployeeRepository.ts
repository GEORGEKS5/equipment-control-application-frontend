import getRequestPromise from "../../helpers/lib";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import { TUserContext } from "../../helpers/types";

export default function(){
    const [employeeInitialRepository, setEmployeeInitialRepository] = useState([]);
    const [directorInitialRepository, setDirectorInitialRepository] = useState([]);
    const [hrManagerInitialRepository, setHrManagerInitialRepository] = useState([]);

    const {USER_STATE} = useContext<{USER_STATE: TUserContext}>(UserContext);
    const servUrlAddr = USER_STATE.getServerUrlAddress();

    const getEmployeeRepository = async function () {
        const endPoint = 'GetEmployeeAbsolutList'
        const requestPromise = await getRequestPromise(servUrlAddr, endPoint);
        const jsonResponse = await requestPromise.json();

        setEmployeeInitialRepository(jsonResponse);
    };

    const getDirectorRepository = async function () {
        const endPoint = 'GetDirectorList'
        const requestPromise = await getRequestPromise(servUrlAddr, endPoint);
        const jsonResponse = await requestPromise.json();

        setDirectorInitialRepository(jsonResponse);
    };

    const getHrManagerRepository = async function <T> (): Promise<T> {
        const endPoint = 'GetHrManagerList'
        const requestPromise = await getRequestPromise(servUrlAddr, endPoint);
        const jsonResponse = await requestPromise.json();

        setHrManagerInitialRepository(jsonResponse);

        return jsonResponse
    };

    const getCoreRepositories = async function () {
        await getEmployeeRepository();
        await getHrManagerRepository();
        await getDirectorRepository();
    }

    useEffect(()=>{
        getCoreRepositories();
    }, [])

    return {
        employeeInitialRepository,
        directorInitialRepository,
        hrManagerInitialRepository,
        getCoreRepositories,
        getEmployeeRepository,
        getHrManagerRepository,
        getDirectorRepository,
    }
}