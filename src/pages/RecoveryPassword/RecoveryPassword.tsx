import React from 'react';
import {Grid, Typography} from '@mui/material';
import {useAppSelector} from "../../bll/store";
import Email from "./Email/Email";
import {RecoveryPasswordForm} from "./RecoveryPasswordForm/RecoveryPasswordForm";
import '../../index.css';


const RecoveryPassword = () => {

    const responseInfo = useAppSelector<string>(state => state.recoverPassword.info)

    const titleOne: React.CSSProperties = {
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 26,
        lineHeight: '39px',
        color: '#2D2E46',
        marginBottom: '30px'
    }

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