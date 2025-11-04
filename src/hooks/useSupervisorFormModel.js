import { useState } from "react";

export default function(pinReadyEquipment){
    const [equipEditFormVisibility, setEquipEditFormVisibility] = useState(false);
    const [equipEditSelectedModel, _setEquipEditSelectedModel] = useState({});

    function setEquipEditSelectedModel(event, modelKeyName){
        let activeElement = pinReadyEquipment?.find(val =>{
            return val[modelKeyName] === event.currentTarget.value;
        });

        _setEquipEditSelectedModel(activeElement);
    }

    return{
        equipEditFormVisibility,
        setEquipEditFormVisibility,
        setEquipEditSelectedModel,
        equipEditSelectedModel,
    }
}