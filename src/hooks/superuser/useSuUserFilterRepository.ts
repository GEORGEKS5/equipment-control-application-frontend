import { ref, Ref, watch } from "vue";

export default function(constructiveObjectInitial: Ref<any[]>, pinedEquipmentInitial: Ref<any[]>, actualObjectSupervisorInitial: Ref<any[]>){
    const constructiveObjectFilterRepository = ref([]);
    const pinedEquipmentFilterRepository = ref([]);
    const actualObjectSupervisorFilterRepository = ref([]);

    watch(constructiveObjectInitial, (n, o)=>{
        constructiveObjectFilterRepository.value = constructiveObjectInitial.value;
    });
    
    watch(pinedEquipmentInitial, (n, o)=>{
        pinedEquipmentFilterRepository.value = pinedEquipmentInitial.value;
    });

    watch(actualObjectSupervisorInitial, (n, o)=>{
        actualObjectSupervisorFilterRepository.value = actualObjectSupervisorInitial.value;
    });

    return{
        constructiveObjectFilterRepository,
        pinedEquipmentFilterRepository,
        actualObjectSupervisorFilterRepository,
    }
}