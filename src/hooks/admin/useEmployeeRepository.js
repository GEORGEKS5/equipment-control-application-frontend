import getRequestPromise from "@/helpers/lib";
import { ref } from "vue";
import { useStore } from "vuex";



export default function(){
    const employeeInitialRepository = ref([]);
    const directorInitialRepository = ref([]);
    const hrManagerInitialRepository = ref([]);

    const store = useStore();
    const servUrlAddr = store.getters.SERVERURLADDRESS;

    const getEmployeeRepository = async function () {
        const endPoint = 'GetEmployeeAbsolutList'
        const requestPromise = await getRequestPromise(servUrlAddr, endPoint);
        const jsonResponse = await requestPromise.json();

        employeeInitialRepository.value = jsonResponse;
    };

    const getDirectorRepository = async function () {
        const endPoint = 'GetDirectorList'
        const requestPromise = await getRequestPromise(servUrlAddr, endPoint);
        const jsonResponse = await requestPromise.json();

        directorInitialRepository.value = jsonResponse;
    };

    const getHrManagerRepository = async function () {
        const endPoint = 'GetHrManagerList'
        const requestPromise = await getRequestPromise(servUrlAddr, endPoint);
        const jsonResponse = await requestPromise.json();

        hrManagerInitialRepository.value = jsonResponse;
    };

    const getCoreRepositories = async function () {
        await getEmployeeRepository();
        await getHrManagerRepository();
        await getDirectorRepository();

        console.log(hrManagerInitialRepository.value);
        console.log(employeeInitialRepository.value);
        console.log(directorInitialRepository.value);
    }

    getCoreRepositories();

    return {
        employeeInitialRepository,
        directorInitialRepository,
        hrManagerInitialRepository,
        getCoreRepositories,
        getEmployeeRepository,
        getHrManagerRepository,
        getDirectorRepository,
    }
}