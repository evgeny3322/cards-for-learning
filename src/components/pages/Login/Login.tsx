import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, Navigate} from "react-router-dom";
import s from './Login.module.css'
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {loginTC} from "../../../bll/reducers/login-reducer";
import {LoadingButton} from "@mui/lab";
import {styleBtn, styleForm, styleInput, styleRememberMe} from "./LoginProperties";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.login.isAuth)
    const loadingStatus = useAppSelector<string>(state => state.appReducer.loadingStatus)
    const [hidden, setHidden] = React.useState(false)

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email('invalid email'),
            password: Yup.string().required().min(7, 'min 7 characters'),
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
                                <h2 className={s.styleH}>Sign In</h2>
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

                                <TextField
                                    id={'password'}
                                    variant="standard"
                                    style={styleInput}
                                    error={formik.touched.password && !!formik.errors.password}
                                    label={'password'}
                                    type={hidden ? 'password' : 'text'}
                                    {...formik.getFieldProps('password')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {!hidden ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                {formik.touched.password
                                    && formik.errors.password
                                    && <div style={{fontSize: '10px', color: 'red'}}>{formik.errors.password}</div>}
                                <FormControlLabel
                                    style={styleRememberMe}
                                    label={'Remember me'}
                                    control={<Checkbox checked={formik.values.rememberMe}/>}
                                    {...formik.getFieldProps('rememberMe')}
                                />

                                <div style={{textAlign: "right", marginRight: "33px"}}>
                                    <Link className={s.forgotPassword} to={'/recovery-password'}>Forgot Password</Link>
                                </div>

                                <LoadingButton
                                    loadingPosition="center"
                                    loading={loadingStatus === 'loading'}
                                    sx={styleBtn}
                                    type={'submit'}
                                >
                                    Login
                                </LoadingButton>

                                <FormLabel>
                                    <p className={s.styleP}>Don't have an account?</p>
                                    <Link className={s.signUp} to={'/registration'}>Sign Up</Link>
                                </FormLabel>

                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}