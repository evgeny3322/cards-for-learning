import React from 'react';
import {NavLink, Route} from "react-router-dom";
import style from "./NavBar.module.css"

const NavBar = () => {

    const styleLinks = (NavData: { isActive: boolean }) => {
        return NavData.isActive ? `${style.itemLink} ${style.active}` : style.itemLink;
    };

    return (
        <>
            <NavLink  className={(NavData) => styleLinks(NavData)} to={'profile'}>Profile</NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'login'}>Login</NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'recovery-password'}>Recovery Password</NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'set-new-password/:token'}>New Password</NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'test-components'}>Tests Components</NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'registration'}>Registration</NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'pack-table'}>Pack Table</NavLink>
        </>
    );
};

export default NavBar;
