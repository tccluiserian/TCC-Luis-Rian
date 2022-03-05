import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './reducers/user'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
  
const rootReducer = combineReducers({    
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let storeConfig = createStore(persistedReducer,applyMiddleware(thunk,))
    let persistor = persistStore(storeConfig)
    return { storeConfig, persistor }
}