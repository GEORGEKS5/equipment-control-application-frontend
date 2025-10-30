import React from "react";
import ContentBlockSection from "./contentBlockSection";
import layoutStyle from "../styles/layout.module.css";

function ContentSingleBlock({children}){
    const mainContent = React.Children.toArray(children).find(child => child.type === ContentBlockSection);

    return (
    <div className= {layoutStyle.contentRoot}>
        <div className={layoutStyle.mainContent}>
            {mainContent}
        </div>
    </div>
    )
}

export default ContentSingleBlock;