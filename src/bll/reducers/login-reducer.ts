import {authApi} from '../../api/auth-api';
import {AppRootStateType, ThunkType} from "../store";
import {setAppError, setLoadingStatus} from "./app-reducer";

type LoginStateType = {
    data: LoginResponseType
    isAuth: boolean
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

const initState: LoginStateType = {
    data: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,  // количество колод
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false, // подтвердил ли почту
        rememberMe: false,
        error: ''
    },
    isAuth: false
}

export type LoginActionType =
    | ReturnType<typeof getUserData>

export const loginReducer = (state: LoginStateType = initState, action: LoginActionType): LoginStateType => {
    switch (action.type) {
        case 'GET-USER-DATA':
            return {...state, data: action.data, isAuth: action.isAuth}
        default:
            return state
    }
}
//selector
export const selectLoginIsAuth = (state: AppRootStateType) => state.login.isAuth

//actions
export const getUserData = (data: LoginResponseType, isAuth: boolean) =>
    ({type: 'GET-USER-DATA', data, isAuth} as const)


export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await authApi.login(email, password, rememberMe)
        dispatch(getUserData(res.data, true));
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'));
    }
}


