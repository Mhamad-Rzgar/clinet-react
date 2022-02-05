import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import Asp from './components/APS/Asp';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";


ReactDOM.render(

  // <BrowserRouter>
  //   <Switch>
  //     <Route path="/asp" exact>
  //       <Asp />
  //     </Route>
  //     <Route path="/" exact>
  //       <h1>slaw gyan baxer bey f </h1>
  //     </Route>
  //   </Switch>
  // </BrowserRouter >,
  <Asp />,
  document.getElementById('root')
);
