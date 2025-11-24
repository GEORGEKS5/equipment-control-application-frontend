import UserContext from "../context/user";
import getRequestPromise from "../helpers/lib";
import { useEffect, useState, useContext } from "react";

export default function useEmployeeRepository(formVisible){
    const {USER_STATE} = useContext(UserContext);
    const servAddress = USER_STATE.getServerUrlAddress();
    let [employeesModel, setEmployeesModel] = useState([]);

    let getEmployeeRepositories = function(){
        if(formVisible){
            let prom = getRequestPromise(servAddress, 'GetEmployeeList', {});

            prom.then(promResult=>{
                return promResult.json();
            }).then(jsonResult=>{
                setEmployeesModel(jsonResult);
            });
        }
    };

    useEffect(() => {
        if(formVisible){
            getEmployeeRepositories()
        }
    }, [formVisible])

    return{
        employeesModel,
    }
}