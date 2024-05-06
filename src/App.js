
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './common.scss'
import './dashboard.scss'
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-widgets/scss/styles.scss";
import RouterNav from './Router';
import { Providers } from './redux/provider';


function App() {
  return (
    <>
      <Providers>
        <BrowserRouter>
          <RouterNav />
        </BrowserRouter>
      </Providers>
    </>
  );
}
export default App;
