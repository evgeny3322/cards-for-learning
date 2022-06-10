import React from 'react';
import NavBar from "../navbar/NavBar";
import {Outlet} from "react-router-dom";
import style from "./Layout.module.css"

export const Layout = () => {

    return (
    <>
        <header className={style.header}>
            <NavBar/>
        </header>
        <Outlet/>
    </>
);
};





