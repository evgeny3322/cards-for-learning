import axios from "axios";
import {LoginResponseType} from "../bll/reducers/login-reducer";
import {ProfileStateType} from "../bll/reducers/profile-reducer";


export const instanceHeroku = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true
})

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export type RegistrationParamsType = {
    email: string,
    password: string,
}
export type UpdateUserInfoType = {
    updatedUserInfo: ProfileStateType
}

export const authApi = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('/auth/login', {email, password, rememberMe})
    },
    authMe() {
        return instance.post<LoginResponseType>('/auth/me')
    },
    setNewPass(password: string, token: string) {
        return instance.post("/auth/set-new-password", {password: password, resetPasswordToken: token})
    },
    registration(data: RegistrationParamsType) {
        return instance.post('/auth/register', data);
    },
    newPassword(){
        return instance.post('/auth/set-new-password',);
    },
    updateUserInfo(name: string, avatar: string) {
        return instance.put<UpdateUserInfoType>(`auth/me`, {name, avatar})
            .then(res => res.data)
    },
    logOutProfile() {
        return instance.delete<{ info: string }>('/auth/me', {})
    },
    recoveryPassword(email: string) {
        return instanceHeroku.post('/auth/forgot', {
            email, message:
                `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='https://evgeny3322.github.io/cards-for-learning/#/set-new-password/$token$'>link</a>
                </div>`
        })
    },
}

