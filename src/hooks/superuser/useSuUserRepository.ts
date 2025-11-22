import getRequestPromise from "../../helpers/lib";
import { useContext, useState } from "react";
import UserContext from "../../context/user";

export default function(){
    const {USER_STATE} = useContext(UserContext);
    const serverUrlAddress: string = USER_STATE.getServerUrlAddress();

    const [constructiveObjectInitialRepository, setConstructiveObjectInitialRepository] = useState([]);
    const [pinedEquipmentInitialRepository, setPinedEquipmentInitialRepository] = useState([]);
    const [actualObjectSupervisorInitialRepository, setActualObjectSupervisorInitialRepository] = useState([]);

    const getConstructiveObjectInitialRepository = async function(){
        let actObjPromise = await getRequestPromise(serverUrlAddress, 'GetObjectList', {});
        let actObjJsonResult = await actObjPromise.json();

        setConstructiveObjectInitialRepository(actObjJsonResult);
    };

    const getPinedEquipmentInitialRepository = async function(){
        let equipPromise = await getRequestPromise(serverUrlAddress, 'EquipmentListLastFixation', {});
        let equipJsonResult = await equipPromise.json();

        setPinedEquipmentInitialRepository(equipJsonResult);
    };

    const getActualObjectSupervisorInitialRepository = async function(){
        let actSuperPromise = await getRequestPromise(serverUrlAddress, 'GetActualObjectSupervisors', {});
        let actSuperJsonResult = await actSuperPromise.json();

        setActualObjectSupervisorInitialRepository(actSuperJsonResult);
    };

    const getAllRepos = async function() {
        await getActualObjectSupervisorInitialRepository();
        await getPinedEquipmentInitialRepository();
        await getConstructiveObjectInitialRepository();
    }

    return{
        constructiveObjectInitialRepository,
        pinedEquipmentInitialRepository,
        actualObjectSupervisorInitialRepository,
        getActualObjectSupervisorInitialRepository,
        getPinedEquipmentInitialRepository,
        getConstructiveObjectInitialRepository,
        getAllRepos,
        setActualObjectSupervisorInitialRepository,
        setConstructiveObjectInitialRepository,
        setPinedEquipmentInitialRepository,
    }
}