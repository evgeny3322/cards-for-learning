import {Route, Routes} from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import RecoveryPassword from '../pages/RecoveryPassword/RecoveryPassword';
import NewPassword from '../pages/NewPassword/NewPassword';
import Registration from '../pages/Registration/Registration';
import NotFound from '../pages/NotFound/NotFound';
import {TestsComponents} from '../pages/TestsComponents';
import {Layout} from './layout/Layout';
import style from './AppRouter.module.css'
import {Login} from '../pages/Login/Login';
import {CardsList} from '../pages/CardsTable/CardsList';
import {RequireAuth} from "../common/RequireAuth/RequireAuth";
import PacksList from "../pages/PacksList/PacksList";

export const AppRouter = () => {
debugger
    return (
        <div className={style.app}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>

                    <Route index element={<Login/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'profile'} element={<Profile/>}/>
                    <Route path={'recovery-password'} element={<RecoveryPassword/>}/>
                    <Route path={'set-new-password/:token'} element={<NewPassword/>}/>
                    <Route path={'test-components'} element={<TestsComponents/>}/>
                    <Route path={'registration'} element={<Registration/>}/>
                    <Route path="cards/:cardPackID" element={<CardsList/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                    <Route path={'pack-table'} element={
                        <RequireAuth>
                            <PacksList/>
                        </RequireAuth>
                    } />
                </Route>
            </Routes>
        </div>
    );
};