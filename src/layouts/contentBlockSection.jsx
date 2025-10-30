import React from "react";
import ContentSection from "./contentSection";
import layoutStyle from '../styles/layout.module.css';

function ContentBlockSection({children}){
    const contentSection = React.Children.toArray(children).find(child => child.type === ContentSection);

    return (
        <div className={layoutStyle.contentSection}>
            {contentSection}
        </div>
    )
}

export default ContentBlockSection;