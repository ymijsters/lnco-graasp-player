import React from 'react';
import { useParams } from 'react-router-dom';
import { MUTATION_KEYS } from '@graasp/query-client';
import PropTypes from 'prop-types';
import { ItemLoginAuthorization } from '@graasp/ui';
import { ItemContextProvider } from '../context/ItemContext';
import { useMutation, hooks } from '../../config/queryClient';
import MainScreen from './MainScreen';

const ItemScreen = () => (
  <ItemContextProvider>
    <MainScreen />
  </ItemContextProvider>
);

ItemScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ itemId: PropTypes.string }).isRequired,
  }).isRequired,
};

const WrappedItemScreen = () => {
  const { useCurrentMember, useItem, useItemLogin } = hooks;
  const { mutate: signOut } = useMutation(MUTATION_KEYS.SIGN_OUT);
  const { mutate: itemLoginSignIn } = useMutation(
    MUTATION_KEYS.POST_ITEM_LOGIN,
  );
  const { rootId } = useParams();

  const Component = ItemLoginAuthorization({
    signIn: itemLoginSignIn,
    signOut,
    itemId: rootId,
    useCurrentMember,
    useItem,
    useItemLogin,
  })(ItemScreen);
  return <Component />;
};

export default WrappedItemScreen;
