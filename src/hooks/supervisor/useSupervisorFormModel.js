import { useState } from "react";
import { EquipmentModelForm } from "../../helpers/classes";

export default function(pinReadyEquipment){
    const tef = new EquipmentModelForm({SerialNumber: ''});

    const [equipEditFormVisibility, setEquipEditFormVisibility] = useState(false);
    const [equipEditSelectedModel, _setEquipEditSelectedModel] = useState({});

    function setEquipEditSelectedModel(event, modelKeyName){
        tef.show(event, pinReadyEquipment);            

        let activeElement = pinReadyEquipment?.find(val =>{
            return val[modelKeyName] === event.currentTarget.value;
        });

        _setEquipEditSelectedModel(activeElement);
    }

    const [equipCreateFormVisibility, setEquipCreateFormVisibility] = useState(false);

    return{
        equipEditFormVisibility,
        setEquipEditFormVisibility,
        equipCreateFormVisibility,
        setEquipEditSelectedModel,
        equipEditSelectedModel,
        setEquipCreateFormVisibility,
        tef,
    }
}