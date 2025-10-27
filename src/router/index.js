import AdminView from "../views/adminView";
import AuthErrorView from "../views/authErrorView";
import AuthView from "../views/authView";
import HRManagerView from "../views/hrManagerView";
import SuperUserView from "../views/superUserView";
import SupervisorView from "../views/supervisorView";
import UserView from "../views/userView";

const routes = [
    {path: '/Auth', component: AuthView},
    {path: '/Admin', component: AdminView},
    {path: '/AuthError', component: AuthErrorView},
    {path: '/HRManager', component: HRManagerView},
    {path: '/Superuser', component: SuperUserView},
    {path: '/Supervisor', component: SupervisorView},
    {path: '/User', component: UserView},
]

export default routes;