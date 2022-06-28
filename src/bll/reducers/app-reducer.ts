import {AppRootStateType, ThunkType} from '../store';
import {authApi} from '../../api/auth-api';
import {getUserData} from './login-reducer';

export type LoadingStatusType = 'idle' | 'loading'

type InitialStateType = {
    error: string | null
    loadingStatus: LoadingStatusType
    isInitialized: boolean
    trash: any
}

export type AppActionType = ReturnType<typeof setAppError>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setTrash>

const initialState: InitialStateType = {
    error: null,
    loadingStatus: 'idle',
    isInitialized: false,
    trash: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-APP-ERROR':
            return {...state, error: action.error}
        case 'app/SET-LOADING-STATUS':
            return {...state, loadingStatus: action.loadingStatus}
        case 'app/SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        case 'app/SET-TRASH': {
            return {...state, trash: action.value}
        }
        default:
            return state;
    }
}
//selector
export const selectAppStatus = (state: AppRootStateType) => state.appReducer.loadingStatus

//actions
export const setAppError = (error: string | null) => ({type: 'app/SET-APP-ERROR', error} as const)

export const setLoadingStatus = (loadingStatus: LoadingStatusType) => {
    return {
        type: 'app/SET-LOADING-STATUS',
        loadingStatus
    } as const
}

export const setIsInitialized = (isInitialized: boolean) =>
    ({type: 'app/SET-IS-INITIALIZED', isInitialized} as const)

export const setTrash = (value?: any) => ({type: 'app/SET-TRASH', value} as const)

export const authMe = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await authApi.authMe()
        dispatch(getUserData(res.data, true))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        console.log(error)
    } finally {
        dispatch(setLoadingStatus('idle'))
        dispatch(setIsInitialized(true))
    }
}

