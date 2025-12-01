import useEmployeeRepository from '../hooks/admin/useEmployeeRepository';
import useAdminDataTable from '../hooks/admin/useAdminDataTable';
import useFilterEmployeeModel from '../hooks/admin/useFilterEmployeeModel';
import useAdminFormModel from '../hooks/admin/useAdminFormModel';
import getRequestPromise from "../helpers/lib";
import getFullDate from '../helpers/getFullDate';
import { FilterForm } from '../helpers/classes';
import contentBlock from '../layouts/contentBlock';
import contentBlockSection from '../layouts/contentBlockSection';
import contentBlockSplitSection from '../layouts/contentBlockSplitSection';
import contentSplitSection from '../layouts/contentSplitSection';
import contentSection from '../layouts/contentSection';
import contentSectionFooter from '../layouts/slots/contentSectionFooter';
import SectionData from "../layouts/slots/sectionData";
import SectionHeader from "../layouts/slots/sectionHeader";
import SectionFooter from "../layouts/slots/sectionFooter";
import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import headerBlock from '../components/headerBlock';
import dataTable from '../components/table/dataTable';
import employeeCreate from '../components/hrManagerView/employeeCreate';
import employeeEdit from '../components/hrManagerView/registeredEmployeeEdit';
import confirmForm from '../components/confirmForm';
import dataOrder from '../components/dataOrderForm';

function AdminView(){
    return (
        <>
            <h1>Admin View</h1>
        </>
    )
}

export default AdminView;