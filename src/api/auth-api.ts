import axios from "axios";
import {LoginResponseType} from "../bll/reducers/login-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const authApi = {

    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('/auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete<{info: string}>('/auth/me', {})
    },
    authMe() {
        return instance.post<LoginResponseType>('/auth/me', {})
    }
}

