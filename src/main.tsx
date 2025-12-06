import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import {privateRoutes, publicRoutes} from './router'
import { BrowserRouter, Routes, Route} from 'react-router'
import UserContext from './context/user'
import { useState } from 'react'
import { TUserContext } from './helpers/types'

function Root(){
  const [USER_STATE, SET_USER_STATE] = useState<TUserContext>({
      userName: '',
      userRole: '',
      serverProtocol:'http://',
      serverAddress: 'localhost',
      serverPort: '3000',
      employeeName: '',
      employeeLastName: '',
      appointmentDate: '',
      getServerUrlAddress(){
        if('serverProtocol' in this){
          return this.serverProtocol + this.serverAddress + ':' + this.serverPort;
        }
        
        return '';
      },
      getFormatedAppointmentDate(){
            const dt: string = 'appointmentDate' in this ? this.appointmentDate : 'unFormat';

            if(dt){
                let tLetterIndex = dt.indexOf('T');
                let dateTextValue = dt.slice(0,tLetterIndex);
                let dateValue = new Date(dateTextValue);
                let day = dateValue.getDate();
                let formatedDay = day > 9 ? '' + day : '0' + day;
                let formatedDate = formatedDay + ' ' + dateValue. getMonth() + 1 + ' ' + dateValue.getFullYear();

                return formatedDate;
            }
            
            return dt;
      },
  });

  return (
    <UserContext.Provider value={{USER_STATE, SET_USER_STATE}}>
      <BrowserRouter>
        {
            USER_STATE.userRole === ''
                ?
            <Routes>
                {publicRoutes.map(route=>{
                    return <Route path={route.path} Component={route.Component} />
                })}
            </Routes>
                :
            <Routes>
                {[...publicRoutes, ...privateRoutes.filter(route => route.path.includes(USER_STATE.userRole))].map(route =>{
                    return <Route path={route.path} Component={route.Component} />
                })}
            </Routes>
        }
      </BrowserRouter>
    </UserContext.Provider>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
    <Root />,
)
