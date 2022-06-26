import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {AppRouter} from "./components/app-router/AppRouter";
import {useAppDispatch, useAppSelector} from "./bll/store";
import {authMe} from "./bll/reducers/app-reducer";

function App() {

    return (
        <HashRouter>
            <AppRouter/>
        </HashRouter>
    );
}

export default App;

