import {LoginActionType, loginReducer} from "./reducers/login-reducer";
import {appReducer} from "./reducers/app-reducer";
import {newPasswordReducer} from "./reducers/newPassword-reducer";
import {recoveryPasswordReducer} from "./reducers/recoveryPassword-reducer";
import {registrationReducer} from "./reducers/registration-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware from "redux-thunk";

// @ts-ignore
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    appReducer: appReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: registrationReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = LoginActionType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//@ts-ignore
window.store = store



