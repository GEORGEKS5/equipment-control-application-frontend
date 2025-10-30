import SectionHeader from './slots/sectionHeader';
import SectionFooter from './slots/sectionFooter';

function ContentBlockSplitSection({children}) {
    const upperSection = React.Children.toArray(children).find(child => child.type === SectionHeader);
    const lowerSection = React.Children.toArray(children).find(child => child.type === SectionFooter);

    return (
        <div className="grid grid-rows-[40vh_40vh]">
            <div id="upperSection">
                {upperSection}
            </div>
            <div id="lowerSection">
                {lowerSection}
            </div>
        </div>
    )   
}

export default ContentBlockSplitSection;