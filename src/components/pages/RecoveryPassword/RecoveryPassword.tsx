import React from 'react';
import {Grid, Typography} from '@mui/material';
import {useAppSelector} from "../../../bll/store";
import Email from "./Email/Email";
import {RecoveryPasswordForm} from "./RecoveryPasswordForm/RecoveryPasswordForm";
import '../../../index.css';


const RecoveryPassword = () => {

    const responseInfo = useAppSelector<string>(state => state.recoverPassword.info)

    return (
        <>
            <Grid container className={'containerGrid'}>
                <Grid className={'itemGrid'}>

                    {responseInfo
                        ? <Email/>
                        : <RecoveryPasswordForm/>
                    }

                </Grid>
            </Grid>
        </>
    );
};

export default RecoveryPassword;