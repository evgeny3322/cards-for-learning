import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../../pages/Login/Login";
import RecoveryPassword from "../../pages/RecoveryPassword/RecoveryPassword";
import NewPassword from "../../pages/NewPassword/NewPassword";
import Registration from "../../pages/Registration/Registration";
import Profile from "../../pages/Profile/Profile";
import NotFound from "../../pages/NotFound/NotFound";
import {TestsComponents} from "../../pages/TestsComponents";
import Layout from "../layout/Layout";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Profile/>}/>
                <Route path={'login'} element={<Login/>}/>
                <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
                <Route path={'new-password'} element={<NewPassword/>}/>
                <Route path={'test-page'} element={<TestsComponents/>}/>
                <Route path={'registration'} element={<Registration/>}/>


                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;