import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { buildMainPath, HOME_PATH } from '../config/paths';
import MainScreen from './main/MainScreen';
import Home from './main/Home';

export const App = () => (
  <Router>
    <Switch>
      <Route path={buildMainPath()} exact component={MainScreen} />
      <Route path={buildMainPath({ id: null })} exact component={MainScreen} />
      <Route path={HOME_PATH} exact component={Home} />
      <Redirect to={HOME_PATH} />
    </Switch>
  </Router>
);

export default App;
