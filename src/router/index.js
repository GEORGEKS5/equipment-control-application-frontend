import AdminView from "../views/adminView.tsx";
import AuthErrorView from "../views/authErrorView";
import AuthView from "../views/authView";
import HRManagerView from "../views/hrManagerView";
import SuperUserView from "../views/superUserView";
import SupervisorView from "../views/supervisorView";
import UserView from "../views/userView.tsx";
import App from '../App.tsx'

const routes = [
    {path: '/', component: App},
    {path: '/Auth', component: AuthView},
    {path: '/Admin', component: AdminView},
    {path: '/AuthError', component: AuthErrorView},
    {path: '/HRManager', component: HRManagerView},
    {path: '/SuUser', component: SuperUserView},
    {path: '/Supervisor', component: SupervisorView},
    {path: '/User', component: UserView},
]

export default routes;