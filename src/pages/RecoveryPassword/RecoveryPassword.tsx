import React from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginTC} from "../../bll/reducers/login-reducer";
import {Link, Navigate} from "react-router-dom";
import s from "../Login/Login.module.css";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import {styleBtn, styleForm, styleInput, styleRememberMe} from "../Login/LoginProperties";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

const RecoveryPassword = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const loadingStatus = useAppSelector<string>(state => state.appReducer.loadingStatus)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email('invalid email'),
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe));
            setSubmitting(false)
            formik.resetForm();
        }
    })

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.container}>
            <Grid container justifyContent={'center'} style={{padding: '30px'}}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl sx={styleForm} variant={"filled"}>

                            <FormLabel>
                                <h2 className={s.styleH}>Forgot your password?</h2>
                            </FormLabel>

                            <FormGroup>
                                <TextField
                                    id={'email'}
                                    style={styleInput}
                                    label={'email'}
                                    error={formik.touched.email && !!formik.errors.email}
                                    variant="standard"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email
                                    && formik.errors.email
                                    && <div style={{fontSize: '10px', color: 'red'}}>{formik.errors.email}</div>}

                                <FormLabel className={s.styleLabel}>
                                    <p className={s.styleD}>Enter your email address and we will send you <br/>further instructions </p>
                                </FormLabel>

                                <LoadingButton
                                    loadingPosition="center"
                                    loading={loadingStatus === 'loading'}
                                    sx={styleBtn}
                                    type={'submit'}
                                >
                                    Send Instructions
                                </LoadingButton>

                                <FormLabel>
                                    <p className={s.styleP}>Did you remember your password?</p>
                                    <Link className={s.signUp} to={'/login'}>Try logging in</Link>
                                </FormLabel>

                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
};

export default RecoveryPassword;