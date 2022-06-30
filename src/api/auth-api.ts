import axios from "axios";
import {LoginResponseType} from "../bll/reducers/login-reducer";
import { ProfileStateType } from "../bll/reducers/profile-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
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
        return instance.post<LoginResponseType>('/auth/me', {})
    },
    registration(data: RegistrationParamsType) {
        return instance.post('/auth/register', data);
    },
    updateUserInfo(name:string, avatar:string){
        return instance.put<UpdateUserInfoType>(`auth/me`,{name,avatar})
            .then(res=>res.data)
    },
    logOutProfile() {
        return instance.delete<{info: string}>('/auth/me', {})
    },
    
    recoveryPassword(email: string) {
        return instance.post<{info: string}>(
            "/auth/forgot",
            {
                email: email, // кому восстанавливать пароль
                from: `test-front-admin <${email}>`,
                // можно указать разработчика фронта)
                message: `<div style="background-color: #f7f7f7; padding: 15px">
                    Follow 
                    <a href='https://evgeny3322.github.io/cards-for-learning/#/set-new-password/$token$'
                    style="font-weight: bold; color: #1a73e8;">
                    this link</a> to recover your password
                    </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

            }
        )
    },
}

