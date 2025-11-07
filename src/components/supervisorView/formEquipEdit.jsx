import { useContext, useEffect, useMemo, useState } from "react";
import {mdiContentSaveCheckOutline } from '@mdi/js'  
import getEquipmentListData from '../../helpers/Data/equipmentListDataFetch.js'
import getRequestPromise from '../../helpers/lib';
import markSelectedProperty from '../../helpers/markData.js'
import DialogWindow from "../../layouts/dialogWindow";
import FormInput from "../UI/formInput.jsx";
import DefaultButton from "../UI/defaultButton.jsx";
import FormSelectBlock from "../UI/formSelectBlock.jsx";
import UserContext from "../../context/user.js";
import FormField from "../../layouts/slots/formField.jsx";
import FormFooter from "../../layouts/slots/formFooter.jsx";

function FormEquipEdit({visible, editEquipment, hideWindow, updateData, propUpdated}) {
    const [equipmentViewModel, setEquipmentViewModel] = useState({});
    const [equipmentRequestModel, setEquipmentRequestModel] = useState({});
    const [eqCategoryData, setEqCategoryData] = useState([]);
    const [eqBrandData, setEqBrandData] = useState([]);
    const [eqModelData, setEqModelData] = useState([]);

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
        //
    }

    function updateBrand(val){
        updateEquipmentModelState('BrandName', 'BrandId', val)
    }

    function hideForm(v){
        setEquipmentRequestModel({});
        setEquipmentViewModel({});
        hideWindow(v);
    }

    function saveDialog(){
        let servAdr = USER_STATE.getServerUrlAddress();
        console.log(equipmentRequestModel);
        let prp = getRequestPromise(servAdr, 'UpdateEquipment', equipmentRequestModel);

        prp.then(resp=>{
            if(resp.ok){
                updateData(equipmentViewModel);
                setEquipmentViewModel({});
            }
        })
    }

    function markSelectedProperty(selectArray, value, keyName){        
        selectArray.map(item => {
            item.selected = item[keyName] === value ? true : false
        })
    }

    function updateCategoryList(val){
        let servAdr = USER_STATE.getServerUrlAddress();
        let catProm = getRequestPromise(servAdr, 'GetCategoryList');

        catProm.then(promR=>{
            promR.json().then(jsonResult=>{
                setEquipmentViewModel({...equipmentViewModel, CategoryName: val});
                setEqCategoryData(stateVal => {
                    const newVal = [...jsonResult];
                    console.log(newVal);

                    markSelectedProperty(newVal, val, 'id');
                    propUpdated();

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
                setEqBrandData({...jsonResult});
                setEquipmentViewModel({...equipmentViewModel, BrandName: val});

                markSelectedProperty(eqBrandData, equipmentViewModel.BrandName, 'id');
                propUpdated();
            });
        });
    }

    function updateModelList(val){
        let servAdr = USER_STATE.getServerUrlAddress();
        let modelProm = getRequestPromise(servAdr, 'GetSerialModelList');

        modelProm.then(promR=>{
            promR.json().then(jsonResult=>{
                setEqModelData({...jsonResult});
                setEquipmentViewModel({...equipmentViewModel, ModelName: val});

                markSelectedProperty(eqModelData, equipmentViewModel.ModelName, 'id');
                propUpdated();
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
            setEquipmentViewModel({...editEquipment});

            setEquipmentRequestModel({...editEquipment});

            let serverAdr = USER_STATE.getServerUrlAddress();

            let pr = getEquipmentListData(serverAdr, {});

            pr.then(result=>{

                setEqBrandData(v =>{
                    markSelectedProperty(result.BrandList, editEquipment.BrandName, 'id'); //Помечаем у выбраной позиции бренд
                    return result.BrandList;
                });

                setEqModelData(v => {
                    markSelectedProperty(result.SerialModelList, editEquipment.ModelName, 'id');

                    return result.SerialModelList;
                })

                setEqCategoryData(v =>{
                    markSelectedProperty(result.CategoryList, editEquipment.CategoryName, 'id');

                    return result.CategoryList;
                })
            });
        }else{
            setEqBrandData([]);
            setEqCategoryData([]);
            setEqModelData([]);
        }
    }, [visible])

    const brandCategoryBind = useMemo(()=>{
        let o = {
            BrandName: equipmentRequestModel.BrandName,
            CategoryName: equipmentRequestModel.CategoryName,
        };

        return o;
    }, [equipmentRequestModel.BrandName, equipmentRequestModel.CategoryName])

    return(
        <DialogWindow visibleForm={visible} hideForm={hideForm}>
            <FormField>
                <FormSelectBlock 
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

export default FormEquipEdit;