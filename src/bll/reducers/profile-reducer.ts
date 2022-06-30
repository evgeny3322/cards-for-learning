import { ThunkType } from './../store';
import { authApi } from "../../api/auth-api"
import { setAppError, setLoadingStatus, setTrash } from './app-reducer';
import { getUserData, LoginResponseType } from './login-reducer';

export type ProfileStateType = typeof initialState


type UpdateUserInfoAT = ReturnType<typeof updateUserInfo>

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: 0,
    updated: 0,
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',

}

export type ProfileActionsTypes =  UpdateUserInfoAT

const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionsTypes): ProfileStateType => {
    switch (action.type) {

        default: return state
    }
}

export const updateUserInfo = (profile: ProfileStateType) =>
    ({ type: 'profile/UPDATE-USER-INFO', profile }) as const


export const updateUserInfoTC = (name: string, avatar: string): ThunkType => async dispatch => {
    authApi.updateUserInfo(name, avatar)
        .then(res => {
            if (res) {
                dispatch(updateUserInfo(res.updatedUserInfo))
            } else {
                console.log('Error')
            }
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');

            dispatch(error)
        })
}

export const logoutProfile = (): ThunkType => async dispatch => {
    try {
        dispatch(setLoadingStatus('loading'))
        const res = await authApi.logOutProfile()
        dispatch(setTrash(res.data.info))
        dispatch(getUserData({} as LoginResponseType, false))
    } catch (e: any) {
        const error = e.response ? e.response.data.error : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    } finally {
        dispatch(setLoadingStatus('idle'))
    }
}

export default profileReducer
