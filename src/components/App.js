import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { MAIN_PATH } from '../config/paths';
import MainScreen from './main/MainScreen';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={MainScreen} />
      <Route path="/:rootId/:id" exact component={MainScreen} />
      <Route path="/:rootId" exact component={MainScreen} />
      <Redirect to={MAIN_PATH} />
    </Switch>
  </Router>
);

export default App;
