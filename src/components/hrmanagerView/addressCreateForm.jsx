import DialogSplitWindow from '../../layouts/DialogSplitWindow';
import FormSelectBlock from '../UI/formSelectBlock';
import DefaultButton from '../UI/defaultButton';
import FormInput from '../UI/formInput';
import useAddressRepository from '../../hooks/useAddressRepository';
import getRequestPromise from '../../helpers/lib';
import FormFooter from "../../layouts/slots/formFooter";
import MainContent from "../../layouts/slots/mainContent";
import SideBar from "../../layouts/slots/sideBar";
import { useContext, useMemo, useState } from 'react';
import UserContext from '../../context/user';

function AddressCreateForm({formVisible, externalAddressRequestModel, addressCreateEndPointName, activeEmployeeUserName, hideForm, houseCreated}) {
    const {USER_STATE} = useContext(UserContext);
    const {regionRepository, cityRepository, streetListRepository, streetTypeRepository, addressRequestModel, getCityRepository, getRegionRepository, getStreetListRepository, getStreetTypeRepository, setAddressRequestModel} = useAddressRepository(formVisible, externalAddressRequestModel);

    const [defaultFieldValue, setDefaultFieldValue] = useState({
        regionName: 'Область',
        cityName: 'Город',
        streetType: 'Тип',
        streetName: 'Название улицы',
    });

    const regionBind = useMemo(()=>{
        return {
            RegionName: addressRequestModel.regionName,
        }
    }, [addressRequestModel.regionName]);

    const cityBind = useMemo(()=>{
        return {
            CityName: addressRequestModel.cityName,
        }
    }, [addressRequestModel.cityName]);

    const typeBind = useMemo(()=>{
        return{
            TypeName: addressRequestModel.typeName,
        }
    }, [addressRequestModel.typeName]);

    function hideCurrentForm(){
        setAddressRequestModel({
            regionName: '',
            cityName: '',
            typeName: '',
            streetName: '',
            houseId: 0,
        });

        hideForm();
    }
    
    function updateRegionField(item){
        setAddressRequestModel((v) => {
            return {...v, regionName: item['RegionName']};
        });
    }
    
    function updateCityField(item){
        setAddressRequestModel((v) => {
            return {...v, cityName: item['CityName']}
        });
    }
    
    function updateStreetTypeField(item){
        setAddressRequestModel({...addressRequestModel, typeName: item['StreetTypeTypeName']});
    }
    
    function updateStreetNameField(item){
        setAddressRequestModel({...addressRequestModel, streetName: item['StreetTypeNameStreetName']});
    }
    
    function updateHouseField(item){
        setAddressRequestModel({...addressRequestModel, houseNumber: Number(item)});
    }
    
    function updateApartmentField(item){
        setAddressRequestModel({...addressRequestModel, apartmentNumber: Number(item)});
    }
    
    function saveAddress(){
        const servUrlAdr = USER_STATE.getServerUrlAddress();
        const endPoint = addressCreateEndPointName;

        if(activeEmployeeUserName){
            setAddressRequestModel({...addressRequestModel, employeeUserName: activeEmployeeUserName});
        }

        const reqPromise = getRequestPromise(servUrlAdr, endPoint, addressRequestModel);

        reqPromise.then(async (res)=>{
            const jsonResult = await res.json();
            const tempRM = {...addressRequestModel};

            if(jsonResult.length){
                tempRM.houseId = jsonResult[0]['HouseID'];
            }

            houseCreated(tempRM);

            setAddressRequestModel((v)=>{

                return {
                    regionName: '',
                    cityName: '',
                    typeName: '',
                    streetName: '',
                    houseId: 0,
                }
            });
        })
    }
    return (
        <DialogSplitWindow
            visibleForm={formVisible}
            hideForm={hideCurrentForm}>
            <MainContent>
                <FormSelectBlock 
                    fieldCaption="Area"
                    selectBlockData={regionRepository}
                    selectPlaceholder={defaultFieldValue.regionName}
                    selectBlockValue={addressRequestModel.regionName}
                    identificatorKeyName="RegionName"
                    targetModelName="Region"
                    valueKeyName="RegionName"
                    updateSelect={updateRegionField}
                    propRegionInsert={getRegionRepository}
                    propRegionUpdate={getRegionRepository}>
                </FormSelectBlock>
                <FormSelectBlock 
                    fieldCaption="City"
                    targetPropModelName="City"
                    targetModelName="City"
                    selectBlockData={cityRepository}
                    identificatorKeyName="CityName"
                    valueKeyName="CityName"
                    selectPlaceholder={defaultFieldValue.cityName}
                    selectBlockValue={addressRequestModel.cityName}
                    extraRequestData={regionBind}
                    updateSelect={updateCityField}
                    propCityInsert={getCityRepository}
                    propCityUpdate={getCityRepository}>
                </FormSelectBlock>
            </MainContent>
            <SideBar>
               <FormSelectBlock 
                    selectPlaceholder={defaultFieldValue.streetType}
                    selectBlockValue={addressRequestModel.typeName}
                    selectBlockData={streetTypeRepository}
                    identificatorKeyName="TypeName"
                    valueKeyName="TypeName"
                    fieldCaption="StreetType"
                    targetModelName="StreetType"
                    targetPropModelName="StreetType"
                    updateSelect={updateStreetTypeField}
                    propStreetTypeInsert={getStreetTypeRepository}
                    propStreetTypeUpdate={getStreetTypeRepository}>
                </FormSelectBlock>
                <FormSelectBlock 
                    selectBlockValue={addressRequestModel.streetName}
                    selectPlaceholder={defaultFieldValue.streetName}
                    fieldCaption="Street"
                    extraRequestData={typeBind}
                    selectBlockData={streetListRepository}
                    identificatorKeyName="StreetName"
                    valueKeyName="StreetName"
                    targetModelName="StreetTypeName"
                    targetPropModelName="SingleStreetName"
                    selectPropDataUrlAddress="GetStreetNameList"
                    updateSelect={updateStreetNameField}
                    propStreetTypeNameInsert={getStreetListRepository}
                    propStreetTypeNameUpdate={getStreetListRepository}>
                </FormSelectBlock>
                <FormInput 
                    fieldCaption="House"
                    inputValue={addressRequestModel?.houseNumber || '0'}
                    updateInput={updateHouseField}>
                </FormInput>
                <FormInput 
                    fieldCaption="Appartment"
                    inputValue={addressRequestModel?.apartmentNumber || '0'}
                    updateInput={updateApartmentField}>
                </FormInput>
            </SideBar>
            <FormFooter>
                <DefaultButton
                    buttonCaption="Select"
                    buttonClass="form"
                    buttonClick={saveAddress}>
                </DefaultButton>
            </FormFooter>
        </DialogSplitWindow>
    )
}

export default AddressCreateForm;