import Home from '~/pages/Home';
import Following from '~/pages/Following';
import { HeaderOnlyLayout } from '~/components/Layout';
import Upload from '~/pages/Upload';
export const publicRoutes = [
    {
        path:"/",
        component:Home
    },
    {
        path:"/following",
        component:Following,
        layout:null
    },
    {
        path:"/upload",
        component:Upload,
        layout:HeaderOnlyLayout
    }
]
//Required login
export const privateRoutes = [

]