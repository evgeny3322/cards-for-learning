import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {selectLoginIsAuth} from "../../../bll/reducers/login-reducer";


export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const isLoggedIn = useSelector(selectLoginIsAuth)
    const location = useLocation()


    if (!isLoggedIn) {
        return <Navigate to={"/login"} state={{from: location}}/>
    }

    return children
};
