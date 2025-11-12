import { useContext, useEffect, useMemo, useState } from "react";
import getEquipmentSelectData from '../../helpers/Data/equipmentListDataFetch';
import UserContext from "../../context/user";
import { mdiContentSaveCheckOutline } from "@mdi/js";
import markSelectedProperty from "../../helpers/markData";
import DialogWindow from "../../layouts/dialogWindow";
import DefaultButton from "../UI/defaultButton.jsx";
import FormSelectBlock from "../UI/formSelectBlock.jsx";
import FormInput from "../UI/formInput";
import FormField from "../../layouts/slots/formField.jsx";
import FormFooter from "../../layouts/slots/formFooter.jsx";
import getRequestPromise from "../../helpers/lib.js";


function FormEquipNew({visible, updateData, hideWindow}) {
    const [equipmentViewModel, setEquipmentViewModel] = useState({});
    const [equipmentRequestModel, setEquipmentRequestModel] = useState({});
    const [eqCategoryData, setEqCategoryData] = useState([]);
    const [eqBrandData, setEqBrandData] = useState([]);
    const [eqModelData, setEqModelData] = useState([]);
    const defValue = {
        category: 'Категория',
        brand: 'Производитель',
        model: 'Модель',
    };

    const {USER_STATE} = useContext(UserContext);

    function updateEquipmentModelState(propertyKey, propertyName, obj){
        let v = {...equipmentViewModel, [propertyKey]: obj[propertyName]};

        setEquipmentRequestModel(v);
        setEquipmentViewModel(v);
    }

    function updateCategory(val){
        updateEquipmentModelState('CategoryName', 'CategoryId', val)
    }

    function updateModel(val){
        if(val['ModelId'] !== equipmentRequestModel['ModelName']){
            updateEquipmentModelState('ModelName', 'ModelId', val)
            markSelectedProperty(eqModelData, val['ModelId'], 'id');
        }
    }

    function updateBrand(val){
        updateEquipmentModelState('BrandName', 'BrandId', val)
    }

    function hideForm(){
        setEquipmentRequestModel({});
        setEquipmentViewModel({});
        hideWindow();
    }

    const brandCategoryBind = useMemo(()=>{
        let o = {
            BrandName: equipmentRequestModel.BrandName,
            CategoryName: equipmentRequestModel.CategoryName,
        };

        return o;
    }, [equipmentRequestModel.BrandName, equipmentRequestModel.CategoryName])

    function saveDialog(){
        let servAdr = USER_STATE.getServerUrlAddress();
        console.log(equipmentRequestModel);
        let prp = getRequestPromise(servAdr, 'InsertEquipment', equipmentRequestModel);

        prp.then(resp=>{
            if(resp.ok){
                updateData();
                setEquipmentRequestModel({});
                setEquipmentViewModel({});
            }else{
                console.error(resp.status + ' ' + resp.statusText)
            }
        })
    }

    function updateSerialNumber(val){
        const newModel = {...equipmentViewModel, SerialNumber: val};
        setEquipmentViewModel(newModel);
        setEquipmentRequestModel(newModel);
    }

    function updateCategoryList(val){
        let servAdr = USER_STATE.getServerUrlAddress();
        let catProm = getRequestPromise(servAdr, 'GetCategoryList');

        catProm.then(promR=>{
            promR.json().then(jsonResult=>{
                const newModel = {...equipmentViewModel, CategoryName: val};
                setEquipmentViewModel(newModel);
                setEquipmentRequestModel(newModel);

                setEqCategoryData(stateVal => {
                    const newVal = [...jsonResult];
                    markSelectedProperty(newVal, val, 'id');

                    return newVal
                });
            });
        })
    }

    function updateBrandList(val){
        let servAdr = USER_STATE.getServerUrlAddress();
        let brandProm = getRequestPromise(servAdr, 'GetBrandList');

        brandProm.then(promR=>{
            promR.json().then(jsonResult=>{
                const newModel = {...equipmentViewModel, BrandName: val};
                setEquipmentViewModel(newModel);
                setEquipmentRequestModel(newModel);

                setEqBrandData(() => {
                    const newVal = [...jsonResult];
                    markSelectedProperty(newVal, val, 'id');

                    return newVal
                });
            });
        });
    }

    function updateModelList(val){
        let servAdr = USER_STATE.getServerUrlAddress();
        let modelProm = getRequestPromise(servAdr, 'GetSerialModelList');

        modelProm.then(promR=>{
            promR.json().then(jsonResult=>{
                const newModel = {...equipmentViewModel, ModelName: val};
                setEquipmentViewModel(newModel);
                setEquipmentRequestModel(newModel);

                setEqModelData(() => {
                    const newVal = [...jsonResult];
                    markSelectedProperty(newVal, val, 'id');

                    return newVal;
                });
            });
        });
    }

    function updateSingleModelList(val){
        console.log(val);
        let servAdr = USER_STATE.getServerUrlAddress();
        let modelProm = getRequestPromise(servAdr, 'GetModelList');

        modelProm.then(promR=>{
                promR.json().then(jsonResult=>{
                //setEqPropModelData({...jsonResult});

                //markSelectedProperty(eqPropModelData, val, 'id');
            });
        });
    }

    useEffect(() => {
        if(visible){
            let serverAdr = USER_STATE.getServerUrlAddress();
            let pr = getEquipmentSelectData(serverAdr, {});

            pr.then(result=>{
                setEqBrandData(result.BrandList);
                setEqModelData(result.SerialModelList)
                setEqCategoryData(result.CategoryList)
            });
        }else{
            setEqBrandData([]);
            setEqCategoryData([]);
            setEqModelData([]);
        }
    }, [visible])
    
    return (
       <DialogWindow visibleForm={visible} hideForm={hideForm}>
            <FormField>
                <FormSelectBlock 
                    selectPlaceholder={defValue.category}
                    selectBlockValue={equipmentViewModel.CategoryName}
                    selectBlockData={eqCategoryData}
                    identificatorKeyName="id" 
                    valueKeyName="id" 
                    targetModelName="Category"
                    fieldCaption="Категория"
                    extraRequestData={{}}
                    sendPropUpdate={updateCategoryList}
                    sendPropInsert={updateCategoryList}
                    updateSelect={updateCategory}>
                </FormSelectBlock>
                <FormSelectBlock 
                    selectPlaceholder={defValue.brand}
                    selectBlockValue={equipmentViewModel.BrandName}
                    selectBlockData={eqBrandData}
                    targetModelName="Brand"
                    identificatorKeyName="id" 
                    valueKeyName="id" 
                    fieldCaption="Производитель"
                    extraRequestData={{}}
                    sendPropUpdate={updateBrandList}
                    sendPropInsert={updateBrandList}
                    updateSelect={updateBrand}>
                </FormSelectBlock>
                <FormSelectBlock 
                    selectPlaceholder={defValue.model}
                    selectBlockValue={equipmentViewModel.ModelName}
                    selectBlockData={eqModelData}
                    selectPropDataUrlAddress="GetModelList" 
                    fieldCaption="Модель"
                    targetModelName="Model"
                    targetPropModelName="SingleModel"
                    identificatorKeyName="id" 
                    valueKeyName="id" 
                    extraRequestData={brandCategoryBind}
                    sendPropUpdate={updateModelList}
                    sendPropInsert={updateModelList}
                    propSingleModelInsert={updateSingleModelList}
                    updateSelect={updateModel}>
                </FormSelectBlock>
                <FormInput 
                    inputValue={equipmentViewModel.SerialNumber ?? ''}
                    fieldCaption="Серийный номер"
                    updateInput={updateSerialNumber}>
                </FormInput>
            </FormField>
            <FormFooter>
                <DefaultButton 
                    buttonIconPath={mdiContentSaveCheckOutline}
                    buttonClass="form" 
                    buttonClick={saveDialog}>    
                </DefaultButton>
            </FormFooter>
        </DialogWindow>
    )
}

export default FormEquipNew;