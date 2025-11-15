import DataTableHeader from "./dataTableHeader";
import DefaultButton from "../UI/defaultButton";
import tableStyle from '../../styles/table.module.css';

function DataTable({tableData, tableActionButton, buttonClick, ...props}){

    function btnClick(actionButton){

        return function(e){
                console.log('click btn on data table');
                buttonClick(actionButton, e);
        }
    }
    
    return (
        <table className={"overflow-y-scroll overflow-x-scroll xl:overflow-x-hidden block md:w-min h-[90%] md:h-[100%] mx-auto p-0 border-separate border-spacing-y-2"}>
            <thead className={"sticky top-0 bg-[#ffffff]"}>
                <DataTableHeader {...props} tableActionButtonAmount={tableActionButton?.length ?? 0} />
            </thead>
            <tbody>
                {tableData.map((row, index)=>{
                    return (
                        <tr className={tableStyle.tdSizeClass} key={index}>
                            {
                                props.tableStructure.map(column => {
                                    return(
                                        <td key={column.name}>
                                            { ''+row[column.name] }
                                        </td>
                                    )
                                })
                            }
                            {
                                    tableActionButton
                                ?
                                    tableActionButton.map((actionButton, index)=>{
                                        return (
                                            <td key={'tableActionButton' + index}>
                                                <DefaultButton
                                                    buttonCaption={actionButton.caption}
                                                    buttonValue={row[actionButton.valueParamName]}
                                                    buttonClass={'tableAction'}
                                                    buttonClick={btnClick(actionButton.emitEventName)}
                                                ></DefaultButton>
                                            </td>
                                        )
                                    })
                                :
                                <></>
                            }
                        </tr>)
                })}

            </tbody>
        </table>
    )
}

export default DataTable;