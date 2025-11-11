import { useMemo } from "react";
import DefaultButton from "./UI/defaultButton";

function SortBlock({originSortObject = [], orderCategory = '', elementOrdered}) {
    function emitSortingElementsByASC(){
        elementOrdered(getSortedPinReadyEquipmentByASC);
    }

    function emitSortingElementsByDESC(){
        elementOrdered(getSortedPinReadyEquipmentByDESC);
    }

    function sortByASC(a,b){
        const aString = String(a[this.orderCategory]);
        const bString = String(b[this.orderCategory]);

        return aString.localeCompare(bString)
    }

    function sortByDESC(a,b){
        const aString = String(a[this.orderCategory]);
        const bString = String(b[this.orderCategory]);

        return bString.localeCompare(aString)
    }

    const getSortedPinReadyEquipmentByASC = useMemo(()=>{
        if(originSortObject.length){
            return [...originSortObject].sort( sortByASC );
        }
        return [];
    }, [originSortObject]);
    
    const getSortedPinReadyEquipmentByDESC = useMemo(()=>{
        if(originSortObject.length){
            return [...originSortObject].sort( sortByDESC );
        }
        return [];
    }, [originSortObject]);

    return (
        <div className="grid grid-cols-[0.8fr 1fr] items-center">
            <h3 style={{ borderRight: "1px solid black", fontSize: '10px'}}>Сортировка</h3>
            <div className="flex justify-evenly items-center">
                <DefaultButton
                    buttonCaption="А"
                    buttonClass="default"
                    buttonClick={emitSortingElementsByASC}
                ></DefaultButton>
                <DefaultButton
                    buttonCaption="'Я'"
                    buttonClass="'default'"
                    buttonClick={emitSortingElementsByDESC}
                ></DefaultButton>
            </div>    
        </div>
    )
}

export default SortBlock;