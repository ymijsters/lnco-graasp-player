import React from 'react';
import { Main } from '@graasp/ui';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useParams, withRouter } from 'react-router';
import MainMenu from '../common/MainMenu';
import Item from '../common/Item';

const MainScreen = () => {
  const { id, rootId } = useParams();
  const { t } = useTranslation();

  const content = !rootId ? (
    <Typography align="center" variant="h4">
      {t('No item defined.')}
    </Typography>
  ) : (
    <Item id={id || rootId} />
  );

  return (
    <Main open sidebar={rootId && <MainMenu />}>
      {content}
    </Main>
  );
};

MainScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ itemId: PropTypes.string }).isRequired,
  }).isRequired,
};

export default withRouter(MainScreen);
