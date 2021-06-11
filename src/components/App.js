import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { buildMainPath } from '../config/paths';
import MainScreen from './main/MainScreen';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={MainScreen} />
      <Route path="/:rootId/:id" exact component={MainScreen} />
      <Route path="/:rootId" exact component={MainScreen} />
      <Redirect to={buildMainPath()} />
    </Switch>
  </Router>
);

export default App;
