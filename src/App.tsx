import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import UserContext from './context/user';
import { TUserContext } from './helpers/types';
import { hasCookie } from './helpers/cookieManager';
import getRequestPromise from './helpers/lib';

function App() {
  const navigateTo = useNavigate();
  const {USER_STATE, SET_USER_STATE} = useContext<{USER_STATE: TUserContext, SET_USER_STATE: Dispatch<SetStateAction<TUserContext>>}>(UserContext);

  function setUserToStore(empName: string, empLastName: string, userName: string, userRole: string, appointmentDate = ''){
      SET_USER_STATE({
        ...USER_STATE,
        employeeName: empName,
        employeeLastName: empLastName,
        userName,
        userRole,
        appointmentDate,
      })
  }

  async function restoreUserSession() {
    if(hasCookie('userName') || hasCookie('userRole')){
      try {
        let getUserRequest = await getRequestPromise(USER_STATE.getServerUrlAddress(), 'GetUserDataByToken');
        let userDataJson = await getUserRequest.json();

        console.log(userDataJson);
        console.log(!('message' in userDataJson));

        if(userDataJson && !('message' in userDataJson)){
            let {EmpName, EmpLastName, AppointmentDate, RoleName: userRole, UserName: userName} = userDataJson;

            setUserToStore(EmpName, EmpLastName, userName, userRole, AppointmentDate);

            navigateTo(`/${userRole}`);
        } else {
          try{
            await getRequestPromise(USER_STATE.getServerUrlAddress(), 'Logout');
          }catch(e){
            console.error(e);
          }
          
          navigateTo('/Auth');
        }
      } catch (error) {
        console.error(error);
      }

      return;
    }

    navigateTo('/Auth');
  }

  useEffect(()=>{
    restoreUserSession();
  },[])

  return (
    <></>
  )
}

export default App
