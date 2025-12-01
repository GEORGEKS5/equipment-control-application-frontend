import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import routes from './router'
import { BrowserRouter, Routes, Route } from 'react-router'
import UserContext from './context/user'
import { useState } from 'react'

function Root(){
  const [USER_STATE, SET_USER_STATE] = useState({
          userName: '',
          userRole: '',
          serverProtocol:'http://',
          serverAddress: 'localhost',
          serverPort: '3000',
          employeeName: '',
          employeeLastName: '',
          appointmentDate: '',
          getServerUrlAddress: function(){
            if('serverProtocol' in this){
              return this.serverProtocol + this.serverAddress + ':' + this.serverPort;
            }
            
            return '';
          },
          
  });

  return (
    <UserContext.Provider value={{USER_STATE, SET_USER_STATE}}>
      <BrowserRouter>
        <Routes>
          {routes.map(route=>{
            return <Route path={route.path} Component={route.component} />
          })}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(
    <Root />,
)
