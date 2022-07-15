import React from 'react';
import {FormControl, IconButton, Input, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {LoadingStatusType} from "../../../bll/reducers/app-reducer";
import {setNewPasswordTC} from "../../../bll/reducers/recoveryPassword-reducer";
import {styleBtn} from "../Login/LoginProperties";

type FormikErrorType = {
    password?: string
}

const mainBlock: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
}
const styleForm = {
    marginTop: "84px",
    textAlign: 'center',
    width: "413px",
    height: "480px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)"
}
const styleInput = {
    margin: "39px 33px 0 33px",
    width: "347px",
}
const styleH1 = {
    marginTop: "25px",
    lineHeight: "39px",
    fontWeight: "700",
    fontSize: "26px",
}
const styleH2 = {
    fontWeight: "700",
    fontSize: "22px",
    lineHeight: "33px",
}
const styleP = {
    margin: "30px 33px 0 33px",
    color: "#2D2E46",
    opacity: "0.5",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "24px",
}

const NewPassword = () => {

    const loadingStatus = useAppSelector<LoadingStatusType>(state => state.appReducer.loadingStatus)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const token = useParams().token

    const [hidden, setHidden] = React.useState(true)

    const handleClickShowPassword = () => {
        setHidden(!hidden)
    };


    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {

            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Invalid password'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password, token as string)).then(() => navigate('/', {replace: true}))
            formik.resetForm()
        }
    })

    return (
        <div style={mainBlock}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={styleForm} variant={"filled"}>
                    <h1 style={styleH1}>It-incubator</h1>
                    <h2 style={styleH2}>Create new password</h2>
                    <Input style={styleInput}
                           placeholder={"Password"}
                           id="standard-adornment-password"

                           type={hidden ? 'password' : 'text'}

                           {...formik.getFieldProps("password")}

                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowPassword}
                                   >
                                       {!hidden ? <VisibilityOff/> : <Visibility/>}
                                   </IconButton>
                               </InputAdornment>
                           }
                    />
                    {formik.touched.password
                        && formik.errors.password
                        && <div style={{color: 'red'}}>{formik.errors.password}</div>
                    }
                    <p style={{textAlign: 'left', ...styleP}}>
                        Create new password and we will send you further instructions to email
                    </p>
                    <LoadingButton loadingPosition="center"
                                   type={'submit'}
                                   loading={loadingStatus === 'loading'}
                                   sx={styleBtn} >Create new password</LoadingButton>
                </FormControl>
            </form>
        </div>
    );
};

export default NewPassword;