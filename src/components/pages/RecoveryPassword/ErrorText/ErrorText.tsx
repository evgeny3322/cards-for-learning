import React from 'react';
import {FormikValues} from 'formik';
import styles from './ErrorTest.module.css'


export const ErrorText = ({children}: FormikValues ) => {
    return (
        <div className={styles.error}>{children}</div>
    );
};


