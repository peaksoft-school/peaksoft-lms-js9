import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { theme } from './assets/styles/theme'
import { store } from './store/store'
import App from './App'
import './index.css'
import { injectStore } from './config/axiosInstance'

injectStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <App />
            </ThemeProvider>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
)
