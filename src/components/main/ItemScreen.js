import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ItemContextProvider } from '../context/ItemContext';
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

export default withRouter(ItemScreen);
