import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {AppRouter} from "./components/app-router/AppRouter";
import {useAppDispatch, useAppSelector} from './bll/store';
import {authMe} from "./bll/reducers/app-reducer";
import {Loader} from "./components/common/Loader/Loader";
import ErrorSnackbar from "./components/common/SuperComponents/c7-ErrorSnackbar/ErrorSnackbar";
import {ModalWindow} from "./components/common/ModalWindow/ModalWindow";

function App() {
    const dispatch = useAppDispatch()

    const isInitialize = useAppSelector<boolean>(state => state.appReducer.isInitialized)

    React.useEffect(() => {
        dispatch(authMe())
    }, [])

    if (!isInitialize) return <Loader />
    return (
        <HashRouter>
            <ModalWindow/>
            <AppRouter/>
            <ErrorSnackbar/>
        </HashRouter>
    );
}

export default App;

