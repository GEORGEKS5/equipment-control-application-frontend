import React from "react";
import SectionData from "./slots/sectionData";
import SectionHeader from "./slots/sectionHeader";
import SectionFooter from "./slots/sectionFooter";

function ContentSplitSection({children}) {

    const sectionHeader = React.Children.toArray(children).find(child => child.type === SectionHeader);
    const sectionData = React.Children.toArray(children).find(child => child.type === SectionData);
    const sectionFooter = React.Children.toArray(children).find(child => child.type === SectionFooter);
    
    return(
        <div className="grid grid-rows-[4vh_30vh_auto] overflow-hidden">
            <div id="sectionHeader">
                {sectionHeader}
            </div>
            <div className="h-[30vh]">
                {sectionData}
            </div>
            <div className="flex flex-col justify-center">
                {sectionFooter}
            </div>
        </div>
    )
}

export default ContentSplitSection;