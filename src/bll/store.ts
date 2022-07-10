import {LoginActionType, loginReducer} from './reducers/login-reducer';
import {AppActionType, appReducer} from './reducers/app-reducer';
import {newPasswordReducer} from './reducers/newPassword-reducer';
import {
    RecoveryPasswordActionsType,
    recoveryPasswordReducer
} from './reducers/recoveryPassword-reducer';
import {
    RegistrationActionsType,
    registrationReducer
} from './reducers/registration-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { ProfileActionsTypes } from './reducers/profile-reducer';
import {packReducer, PackReducerActionsType} from "./reducers/pack-reducer";
import {modalReducer, ModalReducerActionsType} from "./reducers/modal-reducer";
import {cardsReducer, CardsReducerActionType} from "./reducers/cards-reducer";

// @ts-ignore
//redux-devtools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    appReducer: appReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: registrationReducer,
    pack: packReducer,
    cards: cardsReducer,
    modal: modalReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//redux-devtools
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
    LoginActionType
    | AppActionType
    | RecoveryPasswordActionsType
    | RegistrationActionsType
    | ProfileActionsTypes
    | PackReducerActionsType
    | CardsReducerActionType
    | ModalReducerActionsType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppDispatch = () => useDispatch<DispatchActionType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export default store

//@ts-ignore
window.store = store



