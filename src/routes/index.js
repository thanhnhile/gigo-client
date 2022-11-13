import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"

export const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/auth",
        component: Login
    },
    {
        path: "/register",
        component: Register
    }
]
//Required login
export const privateRoutes = [

]