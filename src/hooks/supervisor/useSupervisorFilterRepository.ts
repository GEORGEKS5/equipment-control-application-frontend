import { Dispatch, useEffect, useState } from "react";

type TEquip = [
    never[],
    Dispatch<never[]>
]

export default function(supervisorPinedEquipment: never[], pinReadyEquipment: never[]){
    const [filterSupervisorPinedEquipment, setFilterSupervisorPinedEquipment]: TEquip = useState([]);
    const [filterPinReadyEquipment, setFilterPinReadyEquipment]: TEquip = useState([]);

    useEffect(() => {
        if(pinReadyEquipment){
            setFilterPinReadyEquipment([...pinReadyEquipment]);
        }
    }, [pinReadyEquipment]);

    useEffect(() => {
        if(supervisorPinedEquipment){
            setFilterSupervisorPinedEquipment([...supervisorPinedEquipment]);
        }
    }, [supervisorPinedEquipment]);

    return{
        filterSupervisorPinedEquipment,
        filterPinReadyEquipment,
        setFilterSupervisorPinedEquipment,
        setFilterPinReadyEquipment,
    }
}