import React, { useContext, useState } from "react";
import ChangePassword from "./changePassword";
import getRequestPromise from "../helpers/lib";
import {useNavigate} from "react-router";
import UserContext from "../context/user";

function HeaderBlock({}) {
    const navigateTo = useNavigate();
    const [USER_STATE] = useContext(UserContext);
    const [changePasswordFormVisible, setChangePasswordFormVisible] = useState(false);

    async function shutdown(){
        try{
            await getRequestPromise(USER_STATE.getServerUrlAddress(), 'Logout');
        }catch(e){
            console.error(e);
        }

        navigateTo('/auth')
    }

    function showChangePasswordForm(){
        setChangePasswordFormVisible(true);
    }

    function hideChangePasswordForm(){
        setChangePasswordFormVisible(false);
    }

    return (
        <>
            <ChangePassword
                formVisible={changePasswordFormVisible}
                hideForm={hideChangePasswordForm}>
            </ChangePassword>
            <header className="bg-[#A6775B] text-[#D0D8D9] md:min-w-[650px] md:p-5 py-3">
                <ul id="header__wrapper" className="flex flex-row justify-evenly md:justify-center content-center">
                    <li id="header__icon" className="min-w-4 md:px-4 rounded-md bg-[#D0D8D9] text-[#07070D] p-1">
                        {pathAccoutCheck ? <svgIcon type="mdi" className="" path={pathAccountCheck}></svgIcon> : <></>}
                    </li>
                    <ul id="header__userBlock" className="flex flex-row justify-evenly md:min-w-[42%] md:mx-5">
                        <li className="min-w-4 md:px-6 leading-5 rounded-sm bg-amber-900 p-1 md:rounded-full text-xs md:text-sm">{USER_STATE.userName}</li>
                        <li className="min-w-4 md:px-6 leading-5 rounded-sm bg-amber-900 p-1 md:rounded-full text-xs md:text-sm">{USER_STATE.userRole}</li>
                        <li className="min-w-4 md:px-6 leading-5 rounded-sm bg-amber-900 p-1 md:rounded-full text-xs md:text-sm">{USER_STATE.employeeLastName}</li>
                        <li className="min-w-4 md:px-6 leading-5 rounded-sm bg-amber-900 p-1 md:rounded-full text-xs md:text-sm">{USER_STATE.employeeName}</li>
                        {USER_STATE.appointmentDate ? <li className="min-w-4 lg:px-6 md:px-5 leading-5 rounded-sm bg-amber-900 p-1 md:rounded-full text-xs md:text-sm">{USER_STATE.appointmentDate}</li> : <></>}
                    </ul>
                    <ul id="header__AccentBar" className="flex flex-row justify-between min-w-[10%]">
                        <li className="flex md:min-w-3 md:px-4 rounded-md bg-black"><button click={shutdown}>{pathExitToApp ? <svgIcon type="mdi" path="pathExitToApp"></svgIcon> : <span>Exit</span>}</button></li>
                        <li className="flex md:min-w-3 md:px-4 rounded-md bg-black"><button click={showChangePasswordForm}>{pathKeyArrowRight ? <svgIcon type="mdi" path="pathKeyArrowRight"></svgIcon> : <span>PSW CHNG</span>}</button></li>
                    </ul>
                </ul>
            </header>
        </>
    )
}

export default HeaderBlock;