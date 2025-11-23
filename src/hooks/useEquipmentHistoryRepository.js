import { useContext, useEffect, useState } from "react";
import getRequestPromise from "../helpers/lib";
import UserContext from "../context/user";

export default function(activeEquipmentSerialNumber = '', formVisible = false){
    const endPoint = 'GetFixHistoryByEquipKey';
    const [equipmentFixationRepository, setEquipmentFixationRepository] = useState([]);
    const {USER_STATE} = useContext(UserContext);
    const servUrl =  USER_STATE.getServerUrlAddress();

    const getEquipmentFixation = async function(){
        if(formVisible){
            //equipmentFixationRepository = [];
            const reqBodyObj = { 'equipmentSerialNumber': activeEquipmentSerialNumber};
            const objectRepositoryRequest = await getRequestPromise(servUrl, endPoint, reqBodyObj);

            setEquipmentFixationRepository(await objectRepositoryRequest.json());
        }
    }

    useEffect(() =>{
        if(formVisible){
            getEquipmentFixation();
        }
    }, [formVisible])
    
    return {
        equipmentFixationRepository,
    }
}