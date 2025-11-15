import { useMemo } from "react";
import blockStyle from '../styles/block.module.css';

function FilterBlock({originFilterObject = [], orderCategory = '', elementOrdered}) {
    
    function filterElements(evt){
        let filterValue = evt.target.value;
        let filteredElements = [];

        filteredElements = originFilterObject.filter(item => {
            let currentString = String(item[orderCategory]); 
            return currentString == filterValue;
        });

        elementOrdered(filteredElements);
    }

    const filterOptions = useMemo(()=>{
        let set = new Set();

        if(originFilterObject.length){
            originFilterObject.forEach(item => {
                set.add(item[orderCategory])
            });
        }

        return Array.from(set);
    },[originFilterObject, orderCategory])

    return (
        <div className="grid grid-rows-[0.25fr_0.7fr] grid-cols-[0.8fr] justify-center overflow-hidden">
            <h3>Фильтрация</h3>
            <div className={blockStyle.listWrapper}>
                <ul>
                    {
                        filterOptions?.map((item) => {
                            return (
                                <li key={'' + item}>
                                    <button className="bg-[#ffffff] text-[#000000]" onClick={filterElements} value={''+item}>{ ''+item }</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default FilterBlock;