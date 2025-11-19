import React from "react";
import FormField from './slots/formField';
import FormFooter from './slots/formFooter';

function DialogWindow({visibleForm, children, hideForm}){

    const formFields = React.Children.toArray(children).find(child => child.type === FormField);
    const formFooter = React.Children.toArray(children).find(child => child.type === FormFooter);

    function hideWindow(){
        hideForm();
    }

    return (
        (visibleForm 
            ?
            <div id="formBackround" className="fixed inset-y-0 inset-x-0 flex justify-center overflow-hidden bg-[#ffffffd9] z-[9999]" onClick={hideWindow}>
                <div onClick={e => e.stopPropagation()} id="formContent" className="bg-[#ffffff] p-0 min-w-[325px] md:min-w-[500px] mx-auto min-h-[610px] shadow-md rounded-md grid grid-rows-[0.25fr_0.50fr_auto] md:grid-rows-[0.15fr_0.70fr_auto]">
                    <div id="formHeader" className="flex flex-col justify-center">
                        <h1 className="text-center text-2xl text-[#000000]">Форма</h1>
                    </div>
                    <div id="formFieldWrapper" className="flex flex-col overflow-hidden justify-evenly p-8 md:px-20">
                        {formFields}
                    </div>
                    <div id="formFooter" className="flex flex-col justify-center items-center">
                        {formFooter}
                    </div>
                </div>
            </div>  
            :
            <></>
        )    
    )
}

export default DialogWindow;