import getRequestPromise from "@/helpers/lib";
import { onBeforeUpdate, ref, watch } from "vue";
import { useStore } from "vuex";

export default function(formVisible, objectIdentificator){
    const objectRepository = ref([]);
    const store = useStore();
    const servUrl =  store.getters.SERVERURLADDRESS;
    const endPoint = 'GetObjectAppointmentHistory';

    const getObjectRepository = async function(){
        if(formVisible.value){
            objectRepository.value = [];
            const reqBodyObj = { 'objectIdentificator': objectIdentificator.value};
            console.log(reqBodyObj);

            const objectRepositoryRequest = await getRequestPromise(servUrl, endPoint, reqBodyObj);

            objectRepository.value = await objectRepositoryRequest.json();
        }
    }

    watch(formVisible, (n,o) =>{
        if(n){
            getObjectRepository();
        }
    })
    
    return {
        getObjectRepository,
        objectRepository,
    }
}