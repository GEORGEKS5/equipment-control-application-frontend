import DefaultButton from "../UI/defaultButton";
import tableStyle from '../../styles/table.module.css';
import { mdiFilter } from "@mdi/js";

function DataTableHeader({tableStructure, tableActionButtonAmount, filterButtonClick}){
    function filtrateColumn(e){
        console.log(e);
        filterButtonClick(e);
    }

    return (
        <tr key='HeaderTableKey'>
            {tableStructure.map(column => {
                return (<td style={{verticalAlign: 'top'}} key={column.name}>
                    
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
                    <td key='tableActionButtonKey' colSpan={tableActionButtonAmount} className={tableStyle.tableActionButtonHeaderCaption} style={{verticalAlign: 'top'}}>
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