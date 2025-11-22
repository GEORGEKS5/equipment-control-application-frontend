import dialogWindow from '../layouts/dialogWindow';
import contentBlock from '../layouts/contentBlock';
import contentBlockSection from '../layouts/contentBlockSection';
import contentBlockSplitSection from '../layouts/contentBlockSplitSection';
import contentSection from '../layouts/contentSection';
import contentSplitSection from '../layouts/contentSplitSection';

import FormField from '../layouts/slots/formField';
import FormFooter from '../layouts/slots/formFooter';
import MainContent from '../layouts/slots/mainContent';
import SideBar from '../layouts/slots/sideBar';
import SectionHeader from '../layouts/slots/sectionHeader';
import SectionData from "../layouts/slots/sectionData";
import SectionFooter from '../layouts/slots/sectionFooter';
import ContentSectionFooter from "../layouts/slots/contentSectionFooter";

import headerBlock from '../components/headerBlock';
import dataOrderForm from "../components/dataOrderForm";
import dataTable from "../components/table/dataTable";
import dataTableHeader from "../components/table/dataTableHeader";
import defaultButton from "../components/UI/defaultButton";

import useSuUserViewDataTable from "../hooks/superuser/useSuUserViewDataTable";
import useSuUserRepository from "../hooks/superuser/useSuUserRepository";
import useSuUserFilterRepository from '../hooks/superuser/useSuUserFilterRepository';
import useSuUserFormModel from '../hooks/superuser/useSuUserFormModel';

import { FilterForm } from '../helpers/classes';

function SuperUserView(){
    return (
        <>
            <h1>SuperUserView</h1>
        </>
    )
}

export default SuperUserView;