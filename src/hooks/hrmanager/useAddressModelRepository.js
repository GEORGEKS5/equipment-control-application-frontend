import getRequestPromise from "@/helpers/lib";
import { computed, ref, watch } from "vue"
import { useStore } from "vuex";

export default function(formVisible, activeEmployeeUserName, emit){
    const addressModel = ref({
        apartmentNumber: '',
        cityName: '',
        houseNumber: '',
        regionName: '',
        streetName: '',
        typeName: '',
    });
    const store = useStore();

    const getAddressRepostiory = async function() {
        const endPoint = 'GetAddressByEmployeeUserName';
        const servAdr = store.getters.SERVERURLADDRESS;
        const reqBody = { userName: activeEmployeeUserName.value }

        const requestPromise = await getRequestPromise(servAdr, endPoint, reqBody);
        const jsonResponse = await requestPromise.json();

        addressModel.value = camelizeObjectProperties(jsonResponse[0]);
    }

    let addressModelLoaded = ref(false);

    const hideAddressForm = function(){
        addressModelLoaded.value = false;

        Object.assign(addressModel.value, {
            apartmentNumber: '',
            cityName: '',
            houseNumber: '',
            regionName: '',
            streetName: '',
            typeName: '',
        })

        emit('hideForm');
    };

    const camelizeObjectProperties = function(object){
        for(let k in object){
            let currentValue = object[k];
            let propNameArray = k.split('');
            propNameArray[0] = propNameArray[0].toLowerCase();
            let camelizedPropName = propNameArray.join('');

            delete object[k];
            object[camelizedPropName] = currentValue;
        }

        return object;
    };

    watch(formVisible, async (n, o)=>{
        if(n){
            await getAddressRepostiory();
            console.log('Request success. Result below');
            console.log(addressModel.value);
            addressModelLoaded.value = true;
        }
    })

    return{
        addressModel,
        addressModelLoaded,
        hideAddressForm,
        getAddressRepostiory,
    }
}