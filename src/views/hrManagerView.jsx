import HeaderBlock from "../components/headerBlock";
import dataTable from "@/components/dataTable.vue";
import contentSectionFooter from "@/components/contentSectionFooter.vue";
import dataOrderForm from "@/components/dataOrderForm.vue";

import contentSingleBlock from "../layouts/contentBlock.vue";
import contentBlockSection from "../layouts/contentBlockSection.vue";
import contentSection from "../layouts/contentSection.vue";

import useFullEmployeeRepository from '@/composables/HRManagerView/useFullEmployeeRepository.js';
import useHRManagerViewDataTable from "@/composables/HRManagerView/useHRManagerViewDataTable";
import useHRManagerFormModel from "@/composables/HRManagerView/useHRManagerFormModel";
import useFilterEmployeeModel from '@/composables/HRManagerView/useFilterEmployeeModel.js';

import { FilterForm } from "@/helpers/classes";

function HRManagerView(){
    return (
        <>
            <HeaderBlock />
            <h1>HR manager view</h1>
        </>
    )
}

export default HRManagerView;