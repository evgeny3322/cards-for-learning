import React from 'react';
import {ReactComponent as IconEmail} from '../Email/assets/email.svg';
import styles from './Email.module.css'
import {useAppSelector} from "../../../bll/store";


const Email = () => {
    const enteredEmail = useAppSelector<string>(state => state.recoverPassword.enteredEmail)
    return (
        <>
            <IconEmail/>
            <div className={styles.titleEmail}>Check Email</div>
            <div className={styles.textEmail}>{`We've sent an Email with instructions to ${enteredEmail}`}</div>
        </>
    );
};

export default Email;