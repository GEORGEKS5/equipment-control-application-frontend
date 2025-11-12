import { useContext, useState } from "react";
import DialogWindow from "../layouts/dialogWindow";
import FormField from "../layouts/slots/formField";
import FormFooter from "../layouts/slots/formFooter";
import FormInput from "./UI/formInput";
import DefaultButton from "./UI/defaultButton";
import cryptoJs from "crypto-js";
import UserContext from "../context/user";
import getRequestPromise from "../helpers/lib";

function ChangePassword({formVisible, hideForm}){
    const [originPassword, setOriginPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {USER_STATE} = useContext(UserContext);

    function updateOriginPasswordModel(val) {
        setOriginPassword(val)
    }

    function updateNewPasswordModel(val) {
        setNewPassword(val)
    }
    
    function updateConfirmPasswordModel(val) {
        setConfirmPassword(val)
    }

    function hideCurrentForm() {
        setOriginPassword('');
        setNewPassword('');
        setConfirmPassword('');
        hideForm();
    }

    function getHash(operand){
        const salt = 'it6fqw5tre17xzb';
        const crOb = cryptoJs.PBKDF2(operand, salt, { hasher: cryptoJs.algo.SHA512, keySize: 2, iterations: 20});
        const passString = crOb.toString(cryptoJs.enc.Hex);

        return passString;
    }
    
    function getOriginPasswordHash(){
        const servAdr = USER_STATE.getServerUrlAddress();
        const endPointName = 'GetHashPasswordByUserName';

        return getRequestPromise(servAdr, endPointName, { userName: USER_STATE.userName});
    }
    
    function checkPasswordEquility(password, confirmitionPassword){
        return !password.localeCompare(confirmitionPassword);
    }
    
    function checkOriginPasswordEquality(){
        const prms = new Promise((res, rej) =>{
            let originPasswordHashObject = []; 

            getOriginPasswordHash().then(async (resp)=>{
                originPasswordHashObject = await resp.json();

                console.log(originPasswordHashObject);
                if(checkPasswordEquility(originPasswordHashObject[0].UserPassword, getHash(originPassword))){
                    console.log('Origin Passwords hash equal!');
                    res(true)
                }else{
                    console.log('Origin Passwords hash unEqual!');
                    res(false);
                }
            });
        });
        
        return prms;
    }
    
    function sendPasswordChangeRequest(){
        checkOriginPasswordEquality().then(originPasswordEqual=>{
            if(originPasswordEqual){
                if(checkPasswordEquility(newPassword, confirmPassword)){
                    console.log('new and conf passw equal')

                    const servAdr = USER_STATE.getServerUrlAddress();
                    const endPointName = 'UpdateUserHashPassword';
                    const requestPromise = getRequestPromise(servAdr, endPointName, { 
                        userName: USER_STATE.userName,
                        userPasswordHash: getHash(newPassword),
                    });

                    requestPromise.then(response=>{
                        if(response.ok){
                            console.log('Change password is Successful');
                        }else{
                            console.log('Change password is unSuccessful');
                        }

                        hideCurrentForm();
                    })

                }else{
                    console.log('new and conf passw not equal')
                }
            }else{
                console.log('originPassword not Equal')
            }
        })
    }

    return (
        <DialogWindow 
            visibleForm={formVisible}
            hideForm={hideCurrentForm}>
            <FormField>
                <FormInput
                    fieldCaption="Старый пароль"
                    fieldType="password"
                    updateInput={updateOriginPasswordModel}>
                </FormInput>
                <FormInput
                    fieldCaption="Новый пароль"
                    fieldType="password"
                    updateInput={updateNewPasswordModel}>
                </FormInput>
                <FormInput
                    fieldCaption="Подтверждение нового пароля"
                    fieldType="password"
                    updateInput={updateConfirmPasswordModel}>
                </FormInput>
            </FormField>

            <FormFooter>
                <DefaultButton
                    buttonCaption="Сохранить пароль"
                    buttonClass="form"
                    buttonClick={sendPasswordChangeRequest}>
                </DefaultButton>
            </FormFooter>
        </DialogWindow>
    )
}

export default ChangePassword