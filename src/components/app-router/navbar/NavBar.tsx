import React from 'react';
import {Link} from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {
    return (
        <>
            <Link className={style.navbar__link} to={'/'}>Profile</Link>
            <Link className={style.navbar__link} to={'login'}>Login</Link>
            <Link className={style.navbar__link} to={'recovery-password'}>Recovery Password</Link>
            <Link className={style.navbar__link} to={'new-password'}>New Password</Link>
            <Link className={style.navbar__link} to={'test-components'}>Tests Components</Link>
            <Link className={style.navbar__link} to={'registration'}>Registration</Link>
        </>
    );
};

export default NavBar;