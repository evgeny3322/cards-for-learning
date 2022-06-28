import {authApi} from '../../api/auth-api';
import {setAppError, setLoadingStatus} from './app-reducer';
import {DispatchActionType, ThunkType} from "../store";

// type InitStateType = {
//     info: string,
//     enteredEmail: string
// }
type InitStateType = typeof initState;
type SetResponseInfoRecoveryPassword = ReturnType<typeof setResponseInfoRecoveryPassword>
type redirectActionType = ReturnType<typeof redirectEmail>;

const initState = {
    info: '',
    enteredEmail: '',
};

export type RecoveryPasswordActionsType =
    | SetResponseInfoRecoveryPassword
    | redirectActionType

export const recoveryPasswordReducer = (state: InitStateType = initState, action: RecoveryPasswordActionsType): InitStateType => {
    switch (action.type) {
        case 'rp/SET-RESPONSE-INFO':
            return {...state, info: action.info}
        case 'rp/REDIRECT-TO-CHECK-EMAIL-SUCCESS-PAGE':
            return {...state, enteredEmail: action.enteredEmail};
        default:
            return state
    }
}

const setResponseInfoRecoveryPassword = (info: string) =>
    ({type: 'rp/SET-RESPONSE-INFO', info} as const)

export const redirectEmail = (enteredEmail: string) =>
    ({type: 'rp/REDIRECT-TO-CHECK-EMAIL-SUCCESS-PAGE',
    enteredEmail
} as const);

export const sendPasswordRecovery = (email: string): ThunkType => async (dispatch: DispatchActionType) => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await authApi.recoveryPassword(email)
        dispatch(setResponseInfoRecoveryPassword(res.data.info))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}



