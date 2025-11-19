import { useContext, useEffect, useState } from "react";
import getRequestPromise from "../helpers/lib";
import markData from '../helpers/markData';
import UserContext from "../context/user";

export default function(formVisible, externalRequestModel){
    const [regionRepository, setRegionRepository] = useState([]);
    const [cityRepository, setCityRepository] = useState([]);
    const [streetTypeRepository, setStreetTypeRepository] = useState([]);
    const [streetListRepository, setStreetListRepository] = useState([]);
    const [addressRequestModel, setAddressRequestModel] = useState({});
    
    setAddressRequestModel({
        regionName: '',
        cityName: '',
        typeName: '',
        streetName: '',
        houseId: 0,
    });
    
    const [USER_STATE] = useContext(UserContext);
    const servUrl = USER_STATE.getServerUrlAddress();

    const getRequestResult = async function(servUrlAddress, endpoint){
        const promiseRequest = await getRequestPromise(servUrlAddress, endpoint);
        return promiseRequest.json();
    };
    
    const getRegionRepository = async function(markerValue){
        const regionEndPoint = 'GetRegionList';
        const regionJsonRepository = await getRequestResult(servUrl, regionEndPoint);

        markData(regionJsonRepository, markerValue, 'RegionName');

        setRegionRepository(regionJsonRepository);
        setAddressRequestModel({...addressRequestModel, regionName: markerValue});
    };

    const getCityRepository = async function(markerValue){
        const cityEndPoint = 'GetCityRegionList';
        const cityJsonRepository = await getRequestResult(servUrl, cityEndPoint);

        markData(cityJsonRepository, markerValue, 'CityName');

        setCityRepository(cityJsonRepository);
        setAddressRequestModel({...addressRequestModel, cityName: markerValue});
    };

    const getStreetListRepository = async function(markerValue){
        const streetListEndPoint = 'GetStreetList';
        const streetListJsonRepository = await getRequestResult(servUrl, streetListEndPoint);

        markData(streetListJsonRepository, markerValue, 'StreetName');

        setStreetListRepository(streetListJsonRepository);
        setAddressRequestModel({...addressRequestModel, streetName: markerValue});
    };
    
    const getStreetTypeRepository = async function(markerValue){
        const streetTypeEndPoint = 'GetStreetType';
        const streetTypeJsonRepository = await getRequestResult(servUrl, streetTypeEndPoint);

        markData(streetTypeJsonRepository, markerValue, 'TypeName');

        setStreetTypeRepository(streetTypeJsonRepository);
        setAddressRequestModel({...addressRequestModel, typeName: markerValue});
    };

    const getAddressRepository = async function(){
        if(Object.keys(externalRequestModel).length){
            await getRegionRepository(externalRequestModel.regionName);
            await getCityRepository(externalRequestModel.cityName);
            await getStreetListRepository(externalRequestModel.streetName);
            await getStreetTypeRepository(externalRequestModel.typeName);
        }
    };

    const getModelValueFromExternalModel = function(externalValue){
        return externalValue || 0;
    }

    useEffect(()=>{
        if(formVisible){
            getAddressRepository();
            setAddressRequestModel({...addressRequestModel,
                houseNumber: getModelValueFromExternalModel(externalRequestModel.houseNumber),
                apartmentNumber: getModelValueFromExternalModel(externalRequestModel.apartmentNumber),
            });
        }
    }, [formVisible])

    return{
        regionRepository,
        cityRepository,
        streetListRepository,
        streetTypeRepository,
        addressRequestModel,
        getCityRepository,
        getRegionRepository,
        getStreetListRepository,
        getStreetTypeRepository,
    }
}