import { useContext, useEffect, useState } from "react";
import getRequestPromise from "../helpers/lib";
import UserContext from "../context/user";

export default function(formVisible, objectIdentificator){
    const [objectRepository, setObjectRepository] = useState([]);
    const {USER_STATE} = useContext(UserContext);
    const servUrl =  USER_STATE.getServerUrlAddress();
    const endPoint = 'GetObjectAppointmentHistory';

    const getObjectRepository = async function(){
        if(formVisible){
            //objectRepository.value = [];
            const reqBodyObj = { objectIdentificator };
            console.log(reqBodyObj);

            const objectRepositoryRequest = await getRequestPromise(servUrl, endPoint, reqBodyObj);

            setObjectRepository(await objectRepositoryRequest.json());
        }
    }

    useEffect(() =>{
        if(formVisible){
            getObjectRepository();
        }
    }, [formVisible])
    
    return {
        getObjectRepository,
        setObjectRepository,
        objectRepository,
    }
}