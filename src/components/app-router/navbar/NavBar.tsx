import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./NavBar.module.css"
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

const NavBar = () => {

    const styleLinks = (NavData: { isActive: boolean }) => {
        return NavData.isActive ? `${style.itemLink} ${style.active}` : style.itemLink;
    };

    return (
        <>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'profile'}>
                <AccessibilityNewOutlinedIcon sx={{marginRight: '5px'}}/>
                Profile
            </NavLink>
            <NavLink className={(NavData) => styleLinks(NavData)} to={'pack-table'}>
                <NoteAddOutlinedIcon sx={{marginRight: '5px'}}/>
                Pack Table
            </NavLink>
        </>
    );
};

export default NavBar;
