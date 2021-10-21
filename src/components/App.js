import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ItemLoginAuthorization } from '@graasp/ui';
import { MUTATION_KEYS } from '@graasp/query-client';
import { buildMainPath, HOME_PATH } from '../config/paths';
import Home from './main/Home';
import { useMutation, hooks } from '../config/queryClient';
import ItemScreen from './main/ItemScreen';

export const App = () => {
  const { useCurrentMember, useItem, useItemLogin } = hooks;
  const { mutate: signOut } = useMutation(MUTATION_KEYS.SIGN_OUT);
  const { mutate: itemLoginSignIn } = useMutation(
    MUTATION_KEYS.POST_ITEM_LOGIN,
  );

  const renderMainScreen = ({ match: { params } }) => {
    const Component = ItemLoginAuthorization({
      signIn: itemLoginSignIn,
      signOut,
      itemId: params?.rootId,
      useCurrentMember,
      useItem,
      useItemLogin,
    })(ItemScreen);
    return <Component />;
  };

  return (
    <Router>
      <Switch>
        <Route path={buildMainPath()} exact render={renderMainScreen} />
        <Route path={HOME_PATH} exact component={Home} />
        <Redirect to={HOME_PATH} />
      </Switch>
    </Router>
  );
};

export default App;
