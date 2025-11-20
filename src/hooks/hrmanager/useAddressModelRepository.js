import { useContext, useEffect, useState } from "react";
import getRequestPromise from "../../helpers/lib";
import UserContext from "../../context/user";

export default function(formVisible, activeEmployeeUserName, hideForm){
    const [addressModel, setAddressModel] = useState({
        apartmentNumber: '',
        cityName: '',
        houseNumber: '',
        regionName: '',
        streetName: '',
        typeName: '',
    });
    
    const [addressModelLoaded, setAddressModelLoaded] = useState(false);
    const {USER_STATE} = useContext(UserContext);

    const getAddressRepostiory = async function() {
        const endPoint = 'GetAddressByEmployeeUserName';
        const servAdr = USER_STATE.getServerUrlAddress();
        const reqBody = { userName: activeEmployeeUserName }

        const requestPromise = await getRequestPromise(servAdr, endPoint, reqBody);
        const jsonResponse = await requestPromise.json();

        setAddressModel(camelizeObjectProperties(jsonResponse[0]));
    }

    const hideAddressForm = function(){
        setAddressModelLoaded(false);

        setAddressModel({
            apartmentNumber: '',
            cityName: '',
            houseNumber: '',
            regionName: '',
            streetName: '',
            typeName: '',
        });

        hideForm();
    };

    const camelizeObjectProperties = function(object){
        for(let k in object){
            let currentValue = object[k];
            let propNameArray = k.split('');
            propNameArray[0] = propNameArray[0].toLowerCase();
            let camelizedPropName = propNameArray.join('');

            delete object[k];
            object[camelizedPropName] = currentValue;
        }

        return object;
    };

    useEffect(()=>{
        if(formVisible){
            getAddressRepostiory().then(()=>{
                console.log('Request success. Result below');
                console.log(addressModel);
                setAddressModelLoaded(true);
            });
        }
    }, [formVisible])

    return{
        addressModel,
        addressModelLoaded,
        hideAddressForm,
        getAddressRepostiory,
        setAddressModel,
    }
}