import { useContext, useEffect, useState } from "react";
import getRequestPromise from "../helpers/lib";
import UserContext from "../context/user";

export default function(){
    const {USER_STATE} = useContext(UserContext);
    const serverUrlAddress: string = USER_STATE.getServerUrlAddress();

    const [supervisorPinedEquipment, setSupervisorPinedEquipment] = useState([]);
    const [pinReadyEquipment, setPinReadyEquipment] = useState([]);

    const getPinedEquipmentRepository = async function () {
        const bodyObject: { SupervisorUsername: string } = { SupervisorUsername: USER_STATE.userName };
        const supervisorFixationPromise = await getRequestPromise(serverUrlAddress, 'ObjectSupervisorFixations', bodyObject);
        const jsonRes = await supervisorFixationPromise.json();
        setSupervisorPinedEquipment(jsonRes);
    };

    const getPinReadyEquipmentRepository = async function () {
        const fixEquipPromise = await getRequestPromise(serverUrlAddress, 'FixationReadyEquipment', {});
        setPinReadyEquipment(await fixEquipPromise.json());
    };

    const getUnitedRepository = async function() {
        await getPinReadyEquipmentRepository();
        await getPinedEquipmentRepository();
    };

    useEffect(()=>{
        getUnitedRepository();
    }, [])

    return {
        supervisorPinedEquipment,
        pinReadyEquipment,
        getPinedEquipmentRepository,
        getPinReadyEquipmentRepository,
        getUnitedRepository,
    }
}