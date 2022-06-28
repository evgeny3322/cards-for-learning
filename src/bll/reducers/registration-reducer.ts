import {ThunkType} from '../store';
import {setAppError, setLoadingStatus} from './app-reducer';
import {authApi} from "../../api/auth-api";

type InitialStateType = typeof initialState

const initialState = {
    isRegistrationIn: false,
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_REGISTRATION_IS_COMPLETED':
            return {...state, isRegistrationIn: action.payload.isRegistrationIn};
        default:
            return state;
    }
}

// actions
export const setRegistrationIsCompletedAC = (isRegistrationIn: boolean) =>
    ({
        type: 'SET_REGISTRATION_IS_COMPLETED',
        payload: {
            isRegistrationIn,
        },
    } as const);

// thunks
export const registrationTC =
    (email: string, password: string): ThunkType =>
        async dispatch => {
            try {
                dispatch(setLoadingStatus('loading'));
                const {status} = await authApi.registration({email, password});
                if (status) {
                    dispatch(setRegistrationIsCompletedAC(true));
                }
            } catch (e:any) {
                const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
                dispatch(setAppError(error))
            } finally {
                dispatch(setLoadingStatus('idle'));
            }
        };

//types
export type RegistrationActionsType =
    | ReturnType<typeof setRegistrationIsCompletedAC>
