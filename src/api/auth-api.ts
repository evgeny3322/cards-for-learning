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
    authMe() {
        return instance.post<LoginResponseType>('/auth/me', {})
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

