import getRequestPromise from "@/helpers/lib";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import cryptoJs from 'crypto-js';

export default function(emit, employeeRegistEndPointName, houseRequestModel, editableEmployeeModel){
    const employeeRequestModel = ref({
        name: '',
        surName: '',
        lastName: '',
        userName: '',
    });

    const editableEmployeeModelSize = computed(()=>{
        return Object.keys(editableEmployeeModel.value).length
    });

    watch(editableEmployeeModel, (n, o) =>{
        if(editableEmployeeModelSize.value){
            employeeRequestModel.value.name = n.EmployeeName;
            employeeRequestModel.value.surName = n.EmployeeSurName;
            employeeRequestModel.value.lastName = n.EmployeeLastName;
            employeeRequestModel.value.userName = n.UserName;
        }
    });

    const store = useStore();
    
    const userPassword = computed(()=>{
        const salt = 'it6fqw5tre17xzb';
        const crOb = cryptoJs.PBKDF2(employeeRequestModel.value.userName, salt, { hasher: cryptoJs.algo.SHA512, keySize: 2, iterations: 20});
        const passString = crOb.toString(cryptoJs.enc.Hex);

        return passString;
    });

    const clearHouseRequestModel = function(){
        Object.assign(houseRequestModel.value, {
            regionName: '',
            cityName: '',
            typeName: '',
            streetName: '',
            houseNumber: 0,
            houseId: 0,
            apartmentNumber: 0,
        });
    };

    const registerEmployee = function() {
        const houseRequestModelSize = Object.keys(houseRequestModel.value).length;

        const employeeModel = {};

        if(!editableEmployeeModelSize.value){
            employeeModel.userPasswordHash = userPassword.value;

            if(houseRequestModelSize){
                Object.assign(employeeModel, houseRequestModel.value);
            }
        }

        Object.assign(employeeModel, employeeRequestModel.value);

        const servUrlAdr = store.getters.SERVERURLADDRESS;
        const endPoint = employeeRegistEndPointName.value;

        const reqPromise = getRequestPromise(servUrlAdr, endPoint, employeeModel);

        reqPromise.then(res=>{
            console.log('Emp data send, Response recieved');
            emit('employeeRegistred');

            if(houseRequestModelSize){
                clearHouseRequestModel();
            }

            employeeRequestModel.value = {};
        });

        console.log(employeeModel);
    }

    const updateNameModelValue = function(value){ 
        employeeRequestModel.value.name = value;
    };
    const updateLastNameModelValue = function(value){
        employeeRequestModel.value.lastName = value;
    };
    const updateSurNameModelValue = function(value){ 
        employeeRequestModel.value.surName = value;
    };
    const updateUserNameModelValue = function(value){ 
        employeeRequestModel.value.userName = value;
    };

    return{
        employeeRequestModel,
        updateNameModelValue,
        updateLastNameModelValue,
        updateSurNameModelValue,
        updateUserNameModelValue,
        registerEmployee,
        clearHouseRequestModel,
    }
}