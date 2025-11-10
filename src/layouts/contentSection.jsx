import React from "react";
import SectionData from "./slots/sectionData";
import SectionHeader from "./slots/sectionHeader";
import SectionFooter from "./slots/sectionFooter";
import layoutStyle from '../styles/layout.module.css';
import ContentSectionFooter from "./slots/contentSectionFooter";

function ContentSection({children}){
    const sectionHeader = React.Children.toArray(children).find(child => child.type === SectionHeader);
    const sectionData = React.Children.toArray(children).find(child => child.type === SectionData);
    const sectionFooter = React.Children.toArray(children).find(child => child.type === SectionFooter || child.type === ContentSectionFooter);

    return (
        <div className = {layoutStyle.sectionWrapper}>
            <div id="sectionHeader">
                {sectionHeader}
            </div>
            <div className={layoutStyle.sectionData}>
                {sectionData}
            </div>
            <div className={layoutStyle.sectionFooter}>
                {sectionFooter}
            </div>
        </div>
    )
}

export default ContentSection;