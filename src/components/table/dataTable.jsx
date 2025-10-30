import DataTableHeader from "./dataTableHeader";
import DefaultButton from "../../UI/defaultButton";
import tableStyle from '../../styles/table.module.css';

function DataTable({tableData, tableActionButton, ...props}){
    return (
        <table className={"overflow-y-scroll overflow-x-scroll xl:overflow-x-hidden block md:w-min h-[90%] md:h-[100%] mx-auto p-0 border-separate border-spacing-y-2"}>
            <thead className={"sticky top-0 bg-[#ffffff]"}>
                <DataTableHeader {...props} tableActionButtonAmount={tableActionButton.lenght} />
            </thead>
            <tbody>
                {tableData.map(row=>{
                    return (
                        <tr className={tableStyle.tdSizeClass}>
                            {
                                props.tableStructure.map(column => {
                                    console.log(column);
                                    return(
                                        <td>
                                            { row[column.name] }
                                        </td>
                                    )
                                })
                            }
                            {
                                tableActionButton.map(actionButton=>{
                                    return (
                                        <td>
                                            <DefaultButton
                                                buttonCaption={actionButton.caption}
                                                buttonValue={row[actionButton.valueParamName]}
                                                buttonClass={'tableAction'}
                                            ></DefaultButton>
                                        </td>
                                    )
                                })
                            }
                        </tr>)
                })}

            </tbody>
        </table>
    )
}

export default DataTable;