import LoginPage from '../pages/auth/login/LoginPage';
import DashBoardPage from '../pages/dashboard/DashboardPage';

const routes = [
    {
        path: "/dashboard",
        component: DashBoardPage,
        title: "Dashboard"
    },
    {
        path: "/auth/login",
        component: LoginPage,
        title: "Sign in"
    }
]