import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint'
import SearchPoints from './pages/SeachPoints'


const Routes = () =>{
  return(
    <BrowserRouter>
    <Route component={Home} path="/" exact/>
    <Route component={CreatePoint} path="/create-point"/>
    <Route component={SearchPoints} path="/search-point"/>
    </BrowserRouter>
  );
};


export default Routes;