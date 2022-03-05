import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import React from 'react'
import App from './src/App';
import {name as appName} from './app.json';
import storeConfig from './src/store/storeConfig'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';

const store = storeConfig()

const Redux = () => (
    <Provider store={store.storeConfig}>
        <PersistGate loading={null} persistor={store.persistor}> 
            <NavigationContainer>       
                <App />
            </NavigationContainer>     
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
