import CompactForm from '../layouts/compactForm';
import DefaultButton from '../components/UI/defaultButton';

import SectionHeader from '../layouts/slots/sectionHeader';
import SectionData from '../layouts/slots/sectionData';
import SectionFooter from '../layouts/slots/sectionFooter';

import { mdiCheck, mdiClose } from '@mdi/js';

function ConfirmForm({formVisible, formCaption,hideForm , taskConfirmed, taskCanceled}) {
    return (
        <CompactForm 
            formVisible={formVisible}
            hideForm={hideForm}>
                <SectionHeader>
                    <h2 class="text-[#000000] text-center text-md md:text-xl">ПОДТВЕРЖДЕНИЕ</h2>
                </SectionHeader>
                <SectionData>
                    <p class="text-[#000000] text-center text-xs md:text-md">{ formCaption }</p>
                </SectionData>
                <SectionFooter>
                    <div id="actionButton" class="w-[40%] flex flex-row justify-around md:w-[65%]">
                        <DefaultButton 
                            buttonClass="primaryBrown"
                            buttonIconPath={mdiCheck}
                            buttonClick={taskConfirmed}>
                        </DefaultButton>
                        <DefaultButton 
                            buttonIconPath={mdiClose}
                            buttonClick={taskCanceled}>
                        </DefaultButton>
                    </div>
                </SectionFooter>
        </CompactForm>
    )
}

export default ConfirmForm;