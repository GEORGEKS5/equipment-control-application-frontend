import unauthAccessBlock from '../views/authErrorView';
import getRequestPromise from '../helpers/lib';
import HeaderBlock from '../components/headerBlock';
import ContentSingleBlock from '../layouts/ContentSingleBlock';
import ContentSection from '../layouts/contentSection';
import TableColumnHeader from '../helpers/tableColumnHeader';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { TUserContext } from '../helpers/types';
import ContentBlockSection from '../layouts/contentBlockSection';
import SectionData from "../layouts/slots/sectionData";
import SectionHeader from "../layouts/slots/sectionHeader";
import DataTable from '../components/table/dataTable';

function UserView(){
    const {USER_STATE} = useContext<{USER_STATE: TUserContext}>(UserContext);
    const [fixedEquipment, setFixedEquipment] = useState<unknown[]>([]);
    const [fixedEquipmentTableHeader, setFixedEquipmentTableHeader] = useState<unknown[]>([]);

    function createFixedEquipmentTableHeader(){
        const tableHeader = [];

        tableHeader.push(new TableColumnHeader('FixationDate','Дата'))
        tableHeader.push(new TableColumnHeader('CategoryName','Категория'))
        tableHeader.push(new TableColumnHeader('BrandName','Производитель'))
        tableHeader.push(new TableColumnHeader('ModelName','Модель'))
        tableHeader.push(new TableColumnHeader('EmployeeLastName','Имя ответственого'))
        tableHeader.push(new TableColumnHeader('EmployeeName','Фамилия ответственого'))
        tableHeader.push(new TableColumnHeader('ObjectName','Объект'))

        setFixedEquipmentTableHeader(tableHeader);
    }

    useEffect(() => {
        let servAdr = USER_STATE.getServerUrlAddress();
        let fPromise = getRequestPromise(servAdr, 'GetFixationsByEmpsKey', {EmpKey: USER_STATE.userName});

        fPromise.then(res=>{
            res.json().then(r=>{
                console.log(r);
                createFixedEquipmentTableHeader();
                setFixedEquipment(r);
            });
        })
    }, [])

    return (
        <>
            <HeaderBlock></HeaderBlock>
            <ContentSingleBlock>
                <ContentBlockSection>
                    <ContentSection>
                        <SectionHeader>
                            <h3>Закрепленая техника</h3>
                        </SectionHeader>
                        <SectionData>
                            <DataTable
                                tableData={fixedEquipment}
                                tableStructure={fixedEquipmentTableHeader}
                                tableActionButton={[]}
                                buttonClick={()=>{}}>
                            </DataTable>
                        </SectionData>
                    </ContentSection>
                </ContentBlockSection>
            </ContentSingleBlock>
        </>
    )
}

export default UserView;