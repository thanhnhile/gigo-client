import { BlankLayout } from "../layouts"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/login",
        component: Login,
        layout: BlankLayout
    },
    {
        path: "/register",
        component: Register,
        layout: BlankLayout
    }
]
//Required login
export const privateRoutes = [

]