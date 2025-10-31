import { useContext, useMemo, useState } from "react";
import FormInput from '../components/UI/formInput';
import DefaultButton from '../components/UI/defaultButton';
import userContext from "../context/user";
import cryptoJs from "crypto-js";
import getRequestPromise from '../helpers/lib';
import { useNavigate } from "react-router";

function AuthView(){
    const {USER_STATE, SET_USER_STATE} = useContext(userContext);
    const navigateTo = useNavigate();
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const userPasswordHash = useMemo(() => {
        	const salt = 'it6fqw5tre17xzb';
			const crOb = cryptoJs.PBKDF2(userPassword, salt, { hasher: cryptoJs.algo.SHA512, keySize: 2, iterations: 20});
			const passString = crOb.toString(cryptoJs.enc.Hex);

			return passString;
    }, [userPassword]);

    function updateNameModel(val){
        setUserName(val);
    }

    function updatePasswordModel(val){
        setUserPassword(val); 
    }

    function _formatAppointmentDate(dt){
        let tLetterIndex = dt.indexOf('T');
        let dateTextValue = dt.slice(0,tLetterIndex);
        let dateValue = new Date(dateTextValue);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let formatedDay = day > 9 ? day : '0' + day;
        let formatedMouth = month > 9 || '0' + month;
        let formatedDate = [formatedDay, formatedMouth, dateValue.getFullYear()].join('.');

        return formatedDate;
    }

    async function checkUser(){
        const checkinUserData = { UserPasswordHash: userPasswordHash ?? '', UserName: userName ?? ''};
        const apiAddress = USER_STATE.getServerUrlAddress();
        let userPage = 'authError';

        try{
            const userObjectPromise = await getRequestPromise(apiAddress, 'CheckUser', checkinUserData);
            const userArray = await userObjectPromise.json();

            let userResponseData = userArray[0];

            console.log(userResponseData);
            
            if(userResponseData){
                const {RoleName: userRole, EmpName: employeeName, EmpLastName: employeeLastName, AppointmentDate: appointmentDate} = userResponseData;

                SET_USER_STATE({ ...USER_STATE, employeeName, employeeLastName, userRole, userName, appointmentDate: _formatAppointmentDate(appointmentDate)});

                userPage = userRole;

                console.log(document.cookie);
            }else{
                console.error('Server send no data for current pair name/password');
            }

            navigateTo(`/${userPage}`);
        }catch(e){
            console.error(e);
            navigateTo(`/${userPage}`);
        }

        console.log('/checkUser');
    }

    return (
        <div className={"min-h-[600px] flex flex-col justify-center"}>
            <div id="authForm" className={"bg-[#ffffff] grid grid-rows-[auto_3fr_0.6fr] mx-auto w-[70%] max-w-[470px] min-h-[355px] p-10 md:p-28 rounded-xl"}>
            <h1 className={"text-[#000000] text-center text-xl"}>ВХОД</h1>
            <div className={"flex flex-col justify-evenly"}>
                <FormInput 
                fieldCaption={'Имя'}
                updateInput={updateNameModel}>
                </FormInput>
                <FormInput 
                fieldCaption={'Пароль'}
                fieldType={'password'}
                updateInput={updatePasswordModel}>
                </FormInput>
            </div>
            <DefaultButton
                buttonCaption={'Войти'}
                buttonClass={'primaryBrown'}
                buttonClick={checkUser}>
            </DefaultButton>
            </div>
        </div>
    )
}

export default AuthView;