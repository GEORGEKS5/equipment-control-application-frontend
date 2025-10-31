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
import SectionData from "../../layouts/slots/sectionData.jsx";
import SectionFooter from "../../layouts/slots/sectionFooter.jsx";

function FormEquipEdit({visible, editEquipment, hideWindow, updateData, propUpdated}) {
    const [equipmentViewModel, setEquipmentViewModel] = useState({});
    const [equipmentRequestModel, setEquipmentRequestModel] = useState({});
    const [eqCategoryData, setEqCategoryData] = useState([]);
    const [eqBrandData, setEqBrandData] = useState([]);
    const [eqModelData, setEqModelData] = useState([]);

    const [USER_STATE] = useContext(UserContext);

    function updateEquipmentModelState(propertyKey, propertyName, obj){
        let v = {...equipmentViewModel, [propertyKey]: obj[propertyName]};
        setEquipmentRequestModel(v);
        setEquipmentViewModel(v);
    }

    function updateCategory(val){
        updateEquipmentModelState('CategoryName', 'CategoryId', val)
    }

    function updateModel(val){
        updateEquipmentModelState('ModelName', 'ModelId', val)
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

    function markSelectedProperty(selectArray, value){
        selectArray.map(item => {
            item.selected = item.value === value ? true : false
        })
    }

    function updateCategoryList(val){
        let servAdr = USER_STATE.getServerUrlAddress();
        let catProm = getRequestPromise(servAdr, 'GetCategoryList');

        catProm.then(promR=>{
            promR.json().then(jsonResult=>{
                setEqCategoryData({...jsonResult});
                setEquipmentViewModel({...equipmentViewModel, CategoryName: val});

                console.log(val);

                markSelectedProperty(eqCategoryData, equipmentViewModel.CategoryName, 'id');
                propUpdated();
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

                console.log(val);
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

                console.log(val);
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
                console.log(result);
                setEqBrandData(result.BrandList);
                setEqCategoryData(result.CategoryList);
                setEqModelData(result.SerialModelList);

                markSelectedProperty(eqModelData, equipmentViewModel.ModelName, 'id');
                markSelectedProperty(eqCategoryData, equipmentViewModel.CategoryName, 'id');
                markSelectedProperty(eqBrandData, equipmentViewModel.BrandName, 'id'); //Помечаем у выбраной позиции бренд

            });
        }
    })

    const brandCategoryBind = useMemo(()=>{
        let o = {
            BrandName: equipmentRequestModel.BrandName,
            CategoryName: equipmentRequestModel.CategoryName,
        };

        return o;
    }, [equipmentRequestModel])

    return(
        <DialogWindow visibleForm={visible} hideWindow={hideForm}>
            <SectionData>
                <formSelectBlock 
                    selectBlockValue={equipmentViewModel.CategoryName}
                    selectBlockData={eqCategoryData}
                    identificatorKeyName="id" 
                    valueKeyName="id" 
                    targetModelName="Category"
                    fieldCaption="Категория"
                    propCategoryUpdate={updateCategoryList}
                    propCategoryInsert={updateCategoryList}
                    updateSelect={updateCategory}>
                </formSelectBlock>
                <formSelectBlock 
                    selectBlockValue={equipmentViewModel.BrandName}
                    selectBlockData={eqBrandData}
                    targetModelName="Brand"
                    identificatorKeyName="id" 
                    valueKeyName="id" 
                    fieldCaption="Производитель"
                    propBrandUpdate={updateBrandList}
                    propBrandInsert={updateBrandList}
                    updateSelect={updateBrand}>
                </formSelectBlock>
                <formSelectBlock 
                    selectBlockValue={equipmentViewModel.ModelName}
                    selectBlockData={eqModelData}
                    selectPropDataUrlAddress="GetModelList" 
                    fieldCaption="Модель"
                    targetModelName="Model"
                    targetPropModelName="SingleModel"
                    identificatorKeyName="id" 
                    valueKeyName="id" 
                    extraRequestData={brandCategoryBind}
                    propModelUpdate={updateModelList}
                    propModelInsert={updateModelList}
                    propSingleModelInsert={updateSingleModelList}
                    updateSelect={updateModel}>
                </formSelectBlock>
            </SectionData>
            <SectionFooter>
                <defaultButton 
                    buttonIconPath={mdiContentSaveCheckOutline}
                    buttonClass="form" 
                    buttonClick={saveDialog}>    
                </defaultButton>
            </SectionFooter>
        </DialogWindow>
    )
}

export default FormEquipEdit;