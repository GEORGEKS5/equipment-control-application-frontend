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
        
        </>
    )
}

export default HeaderBlock;