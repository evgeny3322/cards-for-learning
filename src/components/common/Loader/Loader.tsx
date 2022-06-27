import React from 'react';
import {CircularProgress} from '@mui/material';
import s from './Loader.module.css'


export const Loader = () => {
    return (
        <div className={s.position}>
            <div className={s.progress}>
                <CircularProgress size={50}/>
            </div>
        </div>
    );
};
