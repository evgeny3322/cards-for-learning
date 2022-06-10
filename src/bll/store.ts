import {loginReducer} from "./reducers/login-reducer";
import {appReducer} from "./reducers/app-reducer";
import {newPasswordReducer} from "./reducers/newPassword-reducer";
import {recoveryPasswordReducer} from "./reducers/recoveryPassword-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
// @ts-ignore

const rootReducer = combineReducers({
    appReducer: appReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: registrationReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store

//@ts-ignore
window.store = store