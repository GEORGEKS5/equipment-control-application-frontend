import SectionHeader from '../layouts/slots/sectionHeader';
import SectionData from '../layouts/slots/sectionData';
import SectionFooter from '../layouts/slots/sectionFooter';
import React from 'react';

function CompactForm({children, formVisible, hideChildForm}) {
    const formHeader = React.Children.toArray(children).find(child => child.type === SectionHeader);
    const formFields = React.Children.toArray(children).find(child => child.type === SectionData);
    const formFooter = React.Children.toArray(children).find(child => child.type === SectionFooter);
    
    function hideForm(){
        hideChildForm(false);
    }

    function stopProp(e){
        e.stopPropagation();
    }

    return(
        
            formVisible
        ?
            <div id="formWrapper" className="z-[999] fixed flex flex-col justify-center items-center inset-x-0 inset-y-0 bg-[#ffffffd9] z-9999999" onClick={hideForm}>
                <div id="formContent" className="bg-[#ffffff] p-10 rounded-sm shadow-xl grid grid-rows-[1.6fr_2fr_1fr]" onClick={stopProp}>
                    <div id="compactFormHeader">
                        {formHeader}
                    </div>
                    <div id="formFieldWrapper">
                        {formFields}
                    </div>
                    <div id="formFooter" className="flex justify-center">
                        {formFooter}
                    </div>
                </div>    
            </div>
        :
            <></>
    )
}

export default CompactForm;