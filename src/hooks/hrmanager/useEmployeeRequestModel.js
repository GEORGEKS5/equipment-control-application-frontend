import { useContext, useEffect, useMemo, useState } from "react";
import getRequestPromise from "../../helpers/lib";
import cryptoJs from 'crypto-js';
import UserContext from "../../context/user";

export default function(employeeRegistEndPointName, houseRequestModel, editableEmployeeModel, employeeRegistred, clearHouseRequestModel){
    const [employeeRequestModel, setEmployeeRequestModel] = useState({
        name: '',
        surName: '',
        lastName: '',
        userName: '',
    });

    const {USER_STATE} = useContext(UserContext);

    const editableEmployeeModelSize = useMemo(()=>{
        return Object.keys(editableEmployeeModel || 0).length
    }, [editableEmployeeModel]);

    useEffect(()=>{
        if(editableEmployeeModelSize){
            setEmployeeRequestModel({...editableEmployeeModel})
        }
    }, [editableEmployeeModel])
    
    const userPassword = useMemo(()=>{
        if(Object.keys(employeeRequestModel || {}).length){
            const salt = 'it6fqw5tre17xzb';
            const crOb = cryptoJs.PBKDF2(employeeRequestModel.userName, salt, { hasher: cryptoJs.algo.SHA512, keySize: 2, iterations: 20});
            const passString = crOb.toString(cryptoJs.enc.Hex);

            return passString;
        }
    }, [employeeRequestModel]);

    const registerEmployee = function() {
        const houseRequestModelSize = Object.keys(houseRequestModel).length;

        const employeeModel = {};

        if(!editableEmployeeModelSize){
            employeeModel.userPasswordHash = userPassword;

            if(houseRequestModelSize){
                Object.assign(employeeModel, houseRequestModel);
            }
        }

        Object.assign(employeeModel, employeeRequestModel);

        const servUrlAdr = USER_STATE.getServerUrlAddress();
        const endPoint = employeeRegistEndPointName;

        const reqPromise = getRequestPromise(servUrlAdr, endPoint, employeeModel);

        reqPromise.then(res=>{
            console.log('Emp data send, Response recieved');
            employeeRegistred();

            if(houseRequestModelSize){
                clearHouseRequestModel();
            }

            setEmployeeRequestModel({
                name: '',
                surName: '',
                lastName: '',
                userName: '',
            });
        });

        console.log(employeeModel);
    }

    const updateNameModelValue = function(value){ 
        setEmployeeRequestModel({...employeeRequestModel, name: value});
    };
    const updateLastNameModelValue = function(value){
        setEmployeeRequestModel({...employeeRequestModel, lastName: value});
    };
    const updateSurNameModelValue = function(value){ 
        setEmployeeRequestModel({...employeeRequestModel, surName: value});
    };
    const updateUserNameModelValue = function(value){ 
        setEmployeeRequestModel({...employeeRequestModel, userName: value});
    };

    return{
        employeeRequestModel,
        updateNameModelValue,
        updateLastNameModelValue,
        updateSurNameModelValue,
        updateUserNameModelValue,
        registerEmployee,
        setEmployeeRequestModel,
    }
}