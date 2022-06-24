import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid,
    IconButton
} from '@material-ui/core'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {FilledInput, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link} from "react-router-dom";
// import {Redirect} from "react-router-dom";
// import {loginTC} from './auth-reducer'
// import {AppRootStateType} from '../../app/store'
import s from './Login.module.css'

export const Login = () => {
    const dispatch = useDispatch()
    // const isAuth = useSelector<boolean>(state => state.login.isAuth)
    // const loadingStatus = useSelector<string>(state => state.appReducer.loadingStatus)
    const [hidden, setHidden] = React.useState(true)

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };

    // const isLoggedIn = useSelector<any, boolean>(state => state.auth.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values, {setSubmitting}) => {
            // dispatch(loginTC(values.email, values.password, values.rememberMe));
            setSubmitting(false)
            formik.resetForm();
        }
    })

    // if (isLoggedIn) {
    // return <Redirect to={"/"} />
    // }

     const styleInput: React.CSSProperties = {
        margin: "10px auto 0",
        width: "347px",
    }

    return  <Grid container justifyContent={'center'} style={{padding: '30px'}}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
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
                        <div style={{textAlign: "right", marginRight: "33px"}}>
                            <Link className={s.forgotPassword} to={'/recovery-password'}>Forgot Password</Link>
                        </div>
                        {/*<LoadingButton loadingPosition="center"*/}
                        {/*               loading={loadingStatus === 'loading'}*/}
                        {/*               sx={styleBtn} type={'submit'}>Login</LoadingButton>*/}
                        <FormLabel>
                            <p className={s.styleP}>Don't have an account?</p>
                            <Link className={s.signUp} to={'/registration'}>Sign Up</Link>
                        </FormLabel>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}