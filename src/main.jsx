/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./assets/scss/app.scss";
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store.jsx'
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from './helper/AuthProvider.jsx'
import { CategoryProvider } from './helper/CategoryProvider.jsx'
import { CommonProvider } from './helper/CommonProvider.jsx';
import { CMsProvider } from './helper/CmsProvider.jsx';
import { MasterProvider } from './helper/MasterProvider.jsx';
import { SettingProvider } from './helper/SettingProvider.jsx';
import { ColonyProvider } from './helper/ColonyProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AuthProvider>
          <CommonProvider>
            <MasterProvider>
              <SettingProvider>
                <CategoryProvider>
                  <ColonyProvider>
                    <CMsProvider>
                      <App />
                    </CMsProvider>
                  </ColonyProvider>
                </CategoryProvider>
              </SettingProvider>
            </MasterProvider>
          </CommonProvider>
        </AuthProvider>
      </Provider>
    </HashRouter>
  </StrictMode>,
)
