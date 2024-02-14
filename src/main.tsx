import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';

import './utils/i18n'
import './index.css'
import store from './store/store';
import Router from "./routes/Router"

declare const window: any;

window.PF = {
  config: {
    mode: 'bs4',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router/>
      <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-center"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
    </Provider>
  </React.StrictMode>,
)
