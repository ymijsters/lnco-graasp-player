import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { buildMainPath, HOME_PATH } from '../config/paths';
import Home from './main/Home';
import ItemScreen from './main/ItemScreen';

export const App = () => (
  <Router>
    <Routes>
      <Route path={buildMainPath()} exact element={<ItemScreen />} />
      <Route path={HOME_PATH} exact element={<Home />} />
      <Route element={() => <Navigate to={HOME_PATH} />} />
    </Routes>
  </Router>
);

export default App;
