import FormFooter from "./slots/formFooter";
import MainContent from "./slots/mainContent";
import SideBar from "./slots/sideBar";
import layoutStyle from "../styles/layout.module.css";
import React from "react";

function DialogSplitWindow({visibleForm, children, hideForm}) {
    const leftFormFields = React.Children.toArray(children).find(child => child.type === MainContent);
    const rightFormFields = React.Children.toArray(children).find(child => child.type === SideBar);
    const formFooter = React.Children.toArray(children).find(child => child.type === FormFooter);

    return (
            visibleForm
        ?
            <div className={layoutStyle.formBackround} onClick={hideForm}>
                <div onClick={e => {e.stopPropagation()}} className={layoutStyle.formContent}>
                    <div id="formHeader">
                        <h1 className="text-center">Форма</h1>
                    </div>
                    <div className={layoutStyle.formFieldWrapper}>
                        <div className="leftColumn">
                            {leftFormFields}
                        </div>
                        <div className={layoutStyle.rightColumn}>
                            {rightFormFields}
                        </div>
                    </div>
                    <div className={layoutStyle.formFooter}>
                        {formFooter}
                    </div>
                </div>
            </div>
        :
            <></>
    )
}

export default DialogSplitWindow;