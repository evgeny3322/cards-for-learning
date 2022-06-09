import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import AppRouter from "./components/app-router/AppRouter";

const App = () => {
    return (
        <HashRouter>
            {/*<ErrorSnackbar/>*/}
            <AppRouter/>
        </HashRouter>
    );
}

export default App;
