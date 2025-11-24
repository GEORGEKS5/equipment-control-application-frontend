import { onBeforeUpdate, onMounted, ref } from "vue";
import { useStore } from "vuex";
import getRequestPromise from "@/helpers/lib";

export default function useEmployeeRepository(formVisible){
    const store = useStore();
    const servAddress = store.getters.SERVERURLADDRESS;
    let employeesModel = ref([]);

    let getEmployeeRepositories = function(){
        if(formVisible.value){
            console.log('Get Request!!!');
            let prom = getRequestPromise(servAddress, 'GetEmployeeList', {});

            prom.then(promResult=>{
                promResult.json().then(jsonResult=>{
                    employeesModel.value = jsonResult;
                });
            });
        }
    };

    onBeforeUpdate(getEmployeeRepositories);

    return{
        employeesModel,
    }
}