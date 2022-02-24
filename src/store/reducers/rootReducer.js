import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import homePageReducer from "./homePageReducer"
import systemReducer from './systemReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
}
const homePagePersistConfig = {
    ...persistCommonConfig,
    key: 'homePage',
    whitelist: ['doctorOfWeek']
}
const systemPersistConfig = {
    ...persistCommonConfig,
    key: 'system',
    whitelist: ['allDoctor']
}

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    homePage: persistReducer(homePagePersistConfig, homePageReducer),
    system: persistReducer(systemPersistConfig, systemReducer),
})