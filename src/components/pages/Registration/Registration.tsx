import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {AppRootStateType, useAppDispatch} from '../../../bll/store';
import {registrationTC} from '../../../bll/reducers/registration-reducer';
import * as Yup from 'yup';
import {styleBtn, styleForm} from '../Login/LoginProperties';
import {FormLabel, IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import s from "./Registration.module.css";

const Registration = () => {
    const dispatch = useAppDispatch()
    const isRegistrationIn = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistrationIn)
    const [hidden, setHidden] = React.useState(false)
    const [hiddenConfirm, setHiddenConfirm] = React.useState(false)

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };
    const handleClickShowConfirmPassword = () => {
        setHiddenConfirm(!hiddenConfirm)
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email('invalid email'),
            password: Yup.string().required().min(8, 'min 8 characters'),
            confirmPassword: Yup.string().required('Required')
                .oneOf([Yup.ref("password"), null], "Passwords must match")
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(registrationTC(values.email, values.password));
            setSubmitting(false)
            formik.resetForm();
        }
    })

    if (isRegistrationIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={s.container}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl sx={styleForm} variant={'filled'}>

                                <FormLabel>
                                    <h2>Sing up</h2>
                                </FormLabel>

                                <FormGroup>
                                    <TextField
                                        label="Email"
                                        margin="normal"
                                        variant="standard"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email &&
                                        formik.errors.email &&
                                        <div style={{color: 'red'}}>{formik.errors.email}</div>}

                                    <TextField id={'password'}
                                               label="Password"
                                               margin="normal"
                                               variant="standard"
                                               type={hidden ? 'password' : 'text'}
                                               {...formik.getFieldProps('password')}
                                               InputProps={{
                                                   endAdornment: (
                                                       <InputAdornment position="end">
                                                           <IconButton
                                                               aria-label="toggle password visibility"
                                                               onClick={handleClickShowPassword}
                                                           >
                                                               {!hidden ? <VisibilityOff/> :
                                                                   <Visibility/>}
                                                           </IconButton>
                                                       </InputAdornment>
                                                   )
                                               }}
                                    />
                                    {formik.touched.password &&
                                        formik.errors.password &&
                                        <div
                                            style={{color: 'red'}}>{formik.errors.password}
                                        </div>}

                                    <TextField
                                        id={'confirmPassword'}
                                        label="Confirm password"
                                        margin="normal"
                                        variant="standard"
                                        type={hiddenConfirm ? 'password' : 'text'}
                                        {...formik.getFieldProps('confirmPassword')}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle confirm password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                    >
                                                        {!hiddenConfirm ? <VisibilityOff/> :
                                                            <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    {formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword &&
                                        <div
                                            style={{color: 'red'}}>{formik.errors.confirmPassword}
                                        </div>}

                                    <LoadingButton
                                        loadingPosition="center"
                                        sx={styleBtn}
                                        type={'submit'}
                                        disabled={!(formik.isValid && formik.dirty)}
                                    >
                                        REGISTER
                                    </LoadingButton>

                                    <FormLabel>
                                        <p>Already have an account?</p>
                                        <Link to={'/login'}>Sign In</Link>
                                    </FormLabel>
                                </FormGroup>
                            </FormControl>
                        </form>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

export default Registration;