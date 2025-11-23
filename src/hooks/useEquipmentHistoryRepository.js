import { ref, watch } from "vue";
import { useStore } from "vuex";
import getRequestPromise from "@/helpers/lib";

export default function(activeEquipmentSerialNumber, formVisible){
    const endPoint = 'GetFixHistoryByEquipKey';
    const equipmentFixationRepository = ref([]);
    const store = useStore();
    const servUrl =  store.getters.SERVERURLADDRESS;

    const getEquipmentFixation = async function(){
        if(formVisible.value){
            equipmentFixationRepository.value = [];
            const reqBodyObj = { 'equipmentSerialNumber': activeEquipmentSerialNumber.value};
            console.log(reqBodyObj);
            const objectRepositoryRequest = await getRequestPromise(servUrl, endPoint, reqBodyObj);

            equipmentFixationRepository.value = await objectRepositoryRequest.json();

            console.log(equipmentFixationRepository.value)
        }
    }

    watch(formVisible, (n,o) =>{
        if(n){
            getEquipmentFixation();
        }
    })
    
    return {
        equipmentFixationRepository,
    }
}