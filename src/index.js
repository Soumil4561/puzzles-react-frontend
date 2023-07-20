import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomScroll from './components/utilities/customScroll';
import { Provider } from 'react-redux';
import store from './store';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomScroll>
        <App />
      </CustomScroll>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
