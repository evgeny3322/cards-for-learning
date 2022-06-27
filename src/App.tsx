import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {AppRouter} from "./components/app-router/AppRouter";
import {useAppDispatch, useAppSelector} from './bll/store';
import {authMe} from "./bll/reducers/app-reducer";
import {Loader} from "./components/common/Loader/Loader";

function App() {
    const dispatch = useAppDispatch()

    const isInitialize = useAppSelector<boolean>(state => state.appReducer.isInitialized)

    React.useEffect(() => {
        dispatch(authMe())
    }, [])

    if (!isInitialize) return <Loader />
    return (
        <HashRouter>
            <AppRouter/>
        </HashRouter>
    );
}

export default App;

