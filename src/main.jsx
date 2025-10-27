import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './router'
import { BrowserRouter, Routes, Route } from 'react-router'

function Root(){
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route=>{
          return <Route path={route.path} Component={route.component} />
        })}
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
    <Root />,
)
