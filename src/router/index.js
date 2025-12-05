import AdminView from "../views/adminView.tsx";
import AuthErrorView from "../views/authErrorView";
import AuthView from "../views/authView";
import HRManagerView from "../views/hrManagerView";
import SuperUserView from "../views/superUserView";
import SupervisorView from "../views/supervisorView";
import UserView from "../views/userView.tsx";
import App from '../App.tsx'

export const privateRoutes = [
    {path: "*", Component: App},
    {path: '/Auth', Component: AuthView},
    {path: '/Admin', Component: AdminView},
    {path: '/AuthError', Component: AuthErrorView},
    {path: '/HRManager', Component: HRManagerView},
    {path: '/SuUser', Component: SuperUserView},
    {path: '/Supervisor', Component: SupervisorView},
    {path: '/User', Component: UserView},
];

export const publicRoutes = [
    {path: "*", Component: App},
    {path: '/Auth', Component: AuthView},
];