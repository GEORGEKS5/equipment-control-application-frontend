import getRequestPromise from "@/helpers/lib";
import { ref } from "vue";
import { useStore } from "vuex";

export default function(){
    const store = useStore();
    const serverUrlAddress: string = store.getters.SERVERURLADDRESS;

    const constructiveObjectInitialRepository = ref([]);
    const pinedEquipmentInitialRepository = ref([]);
    const actualObjectSupervisorInitialRepository = ref([]);


    const getConstructiveObjectInitialRepository = async function(){
        let actObjPromise = await getRequestPromise(serverUrlAddress, 'GetObjectList', {});
        let actObjJsonResult = await actObjPromise.json();

        constructiveObjectInitialRepository.value = actObjJsonResult;
    };

    const getPinedEquipmentInitialRepository = async function(){
        let equipPromise = await getRequestPromise(serverUrlAddress, 'EquipmentListLastFixation', {});
        let equipJsonResult = await equipPromise.json();

        pinedEquipmentInitialRepository.value = equipJsonResult;
    };

    const getActualObjectSupervisorInitialRepository = async function(){

        let actSuperPromise = await getRequestPromise(serverUrlAddress, 'GetActualObjectSupervisors', {});
        let actSuperJsonResult = await actSuperPromise.json();

        actualObjectSupervisorInitialRepository.value = actSuperJsonResult;
    };

    const getAllRepos = async function() {
        await getActualObjectSupervisorInitialRepository();
        await getPinedEquipmentInitialRepository();
        await getConstructiveObjectInitialRepository();
    }

    getAllRepos();

    return{
        constructiveObjectInitialRepository,
        pinedEquipmentInitialRepository,
        actualObjectSupervisorInitialRepository,
        getActualObjectSupervisorInitialRepository,
        getPinedEquipmentInitialRepository,
        getConstructiveObjectInitialRepository,
        getAllRepos,
    }
}