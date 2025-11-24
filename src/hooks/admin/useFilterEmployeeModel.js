import { ref, watch } from "vue"

export default function(employeeInitialRepository, directorInitialRepository, hrManagerInitialRepository){
    const filteredEmployeeModel = ref([]);
    const filteredDirectorModel = ref([]);
    const filteredHrManagerModel = ref([]);

    watch(employeeInitialRepository, (n, o) => {
        filteredEmployeeModel.value = employeeInitialRepository.value;
    });

    watch(directorInitialRepository, (n, o) => {
        filteredDirectorModel.value = directorInitialRepository.value;
    });

    watch(hrManagerInitialRepository, (n, o) => {
        filteredHrManagerModel.value = hrManagerInitialRepository.value;
    });

    return{
        filteredEmployeeModel,
        filteredDirectorModel,
        filteredHrManagerModel,
    }
}