import DefaultButton from "../../components/UI/defaultButton";
import layoutStyle from "../../styles/layout.module.css";

function ContentSectionFooter({buttonCaption, buttonClick}) {
    return (
        <div className={layoutStyle.contentSectionFooter}>
            <DefaultButton
                buttonCaption={buttonCaption}
                buttonClass="sectionFooter"
                buttonClick={buttonClick}>
            </DefaultButton>
        </div>
    )
}

export default ContentSectionFooter;