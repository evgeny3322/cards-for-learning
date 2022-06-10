import {Route, Routes} from "react-router-dom";
import Profile from "../../pages/Profile/Profile";
import Login from "../../pages/Login/Login";
import RecoveryPassword from "../../pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "../../pages/NewPassword/NewPassword";
import Registration from "../../pages/Registration/Registration";
import NotFound from "../../pages/NotFound/NotFound";
import {TestsComponents} from "../../pages/TestsComponents";
import {Layout} from "./layout/Layout";
import style from './AppRouter.module.css'

export const AppRouter = () => {
    return (
        <div className={style.app}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
                    <Route path={'new-password'} element={<NewPassword/>}/>
                    <Route path={'test-components'} element={<TestsComponents/>}/>
                    <Route path={'registration'} element={<Registration/>}/>

                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    );
};