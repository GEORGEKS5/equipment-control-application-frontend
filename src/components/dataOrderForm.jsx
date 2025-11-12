import SortBlock from "./sortBlock";
import FilterBlock from "./filterBlock";
import DefaultButton from "./UI/defaultButton";
import { useEffect, useState } from "react";
import blockStyle from '../styles/block.module.css';

function DataOrderForm({clientRect, formVisible, originFilterObject, originSortObject, orderCategory, elementOrdered, hideForm}) {
    const [filterFormTopOffset, setFilterFormTopOffset] = useState(0);
    const [filterFormLeftOffset, setFilterFormLeftOffset] = useState(0);

    function resetFilter(){
        elementOrdered(originFilterObject);
    }

    function setAbsoluteFormOffset(){
        const customOffset = 3;

        setFilterFormTopOffset(getAbsoluteFormTopOffset(clientRect[0], customOffset)); 
        setFilterFormLeftOffset(getAbsoluteFormLeftOffset(clientRect[0], customOffset));
    }

    function getAbsoluteFormTopOffset(clientRect, customOffset){
        return clientRect.top + customOffset + clientRect.height + window.pageYOffset;
    }

    function getAbsoluteFormLeftOffset(clientRect, customOffset){
        return clientRect.left + customOffset + window.pageXOffset
    }
    
    useEffect(() => {
        if(clientRect){
            
            setAbsoluteFormOffset();
        }
    }, [clientRect]);

    return(
                formVisible 
            ?
                <div className={blockStyle.filterWrapper} style={{top: `${filterFormTopOffset}px`, left: filterFormLeftOffset + 'px'}}>
                    <SortBlock
                        originSortObject={originSortObject}
                        orderCategory={orderCategory}
                        elementOrdered={elementOrdered}
                    ></SortBlock>
                    <FilterBlock
                        originFilterObject={originFilterObject}
                        orderCategory={orderCategory}
                        elementOrdered={elementOrdered}
                    ></FilterBlock>

                    <div id="buttonBlock">
                        <DefaultButton
                            buttonCaption="Сброс"
                            buttonClass="defaultSM"
                            buttonClick={resetFilter}
                        ></DefaultButton>
                        <DefaultButton
                            buttonCaption="Закрыть"
                            buttonClass="actionSM"
                            buttonClick={hideForm}
                        ></DefaultButton>
                    </div>
                </div>
            :
                <></>
    )
}

export default DataOrderForm;