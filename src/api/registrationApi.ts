import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const registrationApi = {
    registration(data: RegistrationParamsType) {
        return instance.post('/auth/register', data);
    },
};

export type RegistrationParamsType = {
    email: string,
    password: string,
}