import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import UserContext from './context/user';
import { TUserContext } from './helpers/types';
import getRequestPromise from './helpers/lib';
import { getUserToken, checkUserToken } from './helpers/userToken';

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
    try {
      const userToken = await getUserToken(USER_STATE.getServerUrlAddress());
      const isTokenActual = checkUserToken(userToken)

      if(isTokenActual && userToken){
          let {EmpName, EmpLastName, AppointmentDate, RoleName: userRole, UserName: userName} = userToken;

          setUserToStore(EmpName, EmpLastName, userName, userRole, AppointmentDate);

          navigateTo(`/${userRole}`);

          return;
      } else {
        try{
          await getRequestPromise(USER_STATE.getServerUrlAddress(), 'Logout');
        }catch(e){
          console.error(e);
        }
        
        navigateTo('/Auth');
        return;
      }
    } catch (error) {
      console.error(error);
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
