import MainContent from './slots/mainContent';
import SideBar from './slots/sideBar';

function ContentBlock({children}) {
    const mainContent = React.Children.toArray(children).find(child => child.type === MainContent);
    const sideBar = React.Children.toArray(children).find(child => child.type === SideBar);

    return(
        <div id="contentRoot" className="flex flex-col xl:flex-row justify-evenly bg-[#07070D] w-[100%] p-2">
            <div id="mainContent" className="flex flex-col w-full xl:w-[60%] bg-[#F3F3F3] h-[87vh] p-3">
                {mainContent}
            </div>
            <div id="sideContent" className="grid grid-col w-full xl:w-[38%] bg-[#F3F3F3] h-[87vh] p-3">
                {sideBar}
            </div>
        </div>
    )
}

export default ContentBlock;