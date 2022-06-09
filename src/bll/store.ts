import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./reducers/login-reducer";
import {appReducer} from "./reducers/app-reducer";
import {newPasswordReducer} from "./reducers/newPassword-reducer";
import {recoveryPasswordReducer} from "./reducers/recoveryPassword-reducer";
import {registrationReducer} from "./reducers/registration-reducer";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    appReducer: appReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoveryPasswordReducer,
    login: loginReducer,
    registration: registrationReducer,
})

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


export default store

//@ts-ignore
window.store = store