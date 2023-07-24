import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { Provider } from 'react-redux';

import './utils/i18n'
import './index.css'
import store from './store/store';
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
