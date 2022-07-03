import {Route, Routes} from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import RecoveryPassword from "../pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "../pages/NewPassword/NewPassword";
import Registration from "../pages/Registration/Registration";
import NotFound from "../pages/NotFound/NotFound";
import {TestsComponents} from "../pages/TestsComponents";
import {Layout} from "./layout/Layout";
import style from './AppRouter.module.css'
import {Login} from "../pages/Login/Login";

export const AppRouter = () => {
    return (
        <div className={style.app}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>


                    {/*<Route index element={<Profile/>}/>*/}
                    <Route index element={<Login/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
                    <Route path={'create-new-password/:token'} element={<NewPassword/>}/>
                    {/*<Route path={'new-password'} element={<NewPassword/>}/>*/}
                    <Route path={'test-components'} element={<TestsComponents/>}/>
                    <Route path={'registration'} element={<Registration/>}/>

                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    );
};