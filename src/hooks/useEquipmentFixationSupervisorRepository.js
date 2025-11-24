import { ref, watch } from "vue";
import { useStore } from "vuex";
import getRequestPromise from '@/helpers/lib.js'

export default function(formVisible, activeFixationSupervisor){
    const supervisorRepository = ref({});
    const store = useStore();

    const getFixationSupervisor = async function(){
        if(formVisible.value){
            const servAdr = store.getters.SERVERURLADDRESS;
            const endPoint = 'GetSupervisorDetail';
            const reqBody = { 'UserName': activeFixationSupervisor.value}

            console.log(reqBody);

            supervisorRepository.value = [];

            const reqProm = await getRequestPromise(servAdr, endPoint, reqBody);
            const reqResult = await reqProm.json();

            supervisorRepository.value = reqResult[0];

            console.log(supervisorRepository.value);
        }
    }

    watch(formVisible, (n, o) => {
        if(n){
            getFixationSupervisor();
        }
    });

    return {
        supervisorRepository,
    }
}