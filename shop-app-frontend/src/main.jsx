import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { StateContext } from './context/context'
import './index.css'
import {BrowserRouter as Router, ScrollRestoration} from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StateContext>
    
    <Router>
    {/* <ScrollToTop/> */}
    <Toaster/>
   <App/>
   </Router>
  </StateContext>
 
)
