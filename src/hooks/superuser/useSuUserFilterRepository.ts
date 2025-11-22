import { useEffect, useState } from "react";
import { ref, Ref, watch } from "vue";

export default function(constructiveObjectInitial: never[], pinedEquipmentInitial: never[], actualObjectSupervisorInitial: never[]){
    const [constructiveObjectFilterRepository, setConstructiveObjectFilterRepository] = useState([]);
    const [pinedEquipmentFilterRepository, setPinedEquipmentFilterRepository] = useState([]);
    const [actualObjectSupervisorFilterRepository, setActualObjectSupervisorFilterRepository] = useState([]);

    useEffect(()=>{
        setConstructiveObjectFilterRepository(constructiveObjectInitial);
    }, [constructiveObjectInitial]);
    
    useEffect(()=>{
        setPinedEquipmentFilterRepository(pinedEquipmentInitial);
    }, [pinedEquipmentInitial]);

    useEffect(()=>{
        setActualObjectSupervisorFilterRepository(actualObjectSupervisorInitial);
    }, [actualObjectSupervisorInitial]);

    return{
        constructiveObjectFilterRepository,
        pinedEquipmentFilterRepository,
        actualObjectSupervisorFilterRepository,
    }
}