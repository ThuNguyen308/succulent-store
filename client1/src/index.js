import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scss/custom.scss';
import './styles/main.scss';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

import store from './redux/store'
import { SearchProvider } from './context/search';
import ErrorBoundary from './components/ErrorBoudary/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Provider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
