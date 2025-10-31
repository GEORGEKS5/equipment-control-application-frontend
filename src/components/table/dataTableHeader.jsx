import DefaultButton from "../UI/defaultButton";
import tableStyle from '../../styles/table.module.css';
import { mdiFilter } from "@mdi/js";

function DataTableHeader({tableStructure, tableActionButtonAmount}){
    function filtrateColumn(){
        return 0;
    }

    console.log(tableStructure);

    return (
        <tr>
            {tableStructure.map(column => {
                return (<td style={{verticalAlign: 'top'}}>
                    
                    <div className={tableStyle.fieldWrapper}>
                        <h3 className={tableStyle.tdHeader}>{ column.localName }</h3>

                        {column.filterable ? 
                            <DefaultButton
                                buttonValue={column.name}
                                buttonClass={'tableHeader'}
                                buttonClick={filtrateColumn}
                                buttonIconPath={mdiFilter}
                            />
                        :
                        <></>
                        }
                    </div>
                </td>)
            })}

            {
                tableActionButtonAmount ?
                    <td colSpan={tableActionButtonAmount} className={tableStyle.tableActionButtonHeaderCaption} style={{verticalAlign: 'top'}}>
                        <div>
                            <h3>Действия</h3>
                        </div>
                    </td>
                :
                <></>
            }
        </tr>
    )
}

export default DataTableHeader