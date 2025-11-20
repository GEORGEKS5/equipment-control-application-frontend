import getRequestPromise from "@/helpers/lib";
import { ref, watch } from "vue";
import { useStore } from "vuex";

export default function(){
    const positionRepository = ref({});
    const departmentRepository = ref({});

    const store = useStore();
    
    const getPositionRepo = async function(v){
        const servAdr = store.getters.SERVERURLADDRESS;
        const endPoint = 'GetPosition';

        const requestPromise = await getRequestPromise(servAdr, endPoint);
        const jsonResponse = await requestPromise.json();

        positionRepository.value = jsonResponse;
    };

    const getDepartmentRepo = async function(v){
        const servAdr = store.getters.SERVERURLADDRESS;
        const endPoint = 'GetDepartment';

        const reqPromise = await getRequestPromise(servAdr, endPoint, {});
        const respObject = await reqPromise.json();

        departmentRepository.value = respObject;
    };

    return{
        positionRepository,
        departmentRepository,
        getPositionRepo,
        getDepartmentRepo,
    }
}