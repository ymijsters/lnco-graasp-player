import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { HOME_PATH } from '../config/paths';
import Home from './main/Home';

export const App = () => (
  <Router>
    <Switch>
      <Route path={HOME_PATH} exact component={Home} />
      <Redirect to={HOME_PATH} />
    </Switch>
  </Router>
);

export default App;
