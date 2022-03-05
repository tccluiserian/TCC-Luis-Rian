import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './customize/theme';
import storeConfig from './store/storeConfig'
import { Provider } from 'react-redux'

const store = storeConfig()

ReactDOM.render(
  <Provider store={store.storeConfig}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  ,
  document.querySelector('#root'),
);
