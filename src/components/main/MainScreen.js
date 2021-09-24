import React from 'react';
import { Loader, Main } from '@graasp/ui';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import { useParams, withRouter } from 'react-router';
import MainMenu from '../common/MainMenu';
import Item from '../common/Item';
import { hooks } from '../../config/queryClient';
import HeaderRightContent from './HeaderRightContent';
import ItemHeader from '../common/ItemHeader';
import PinnedItems from '../common/PinnedItems';

const MainScreen = () => {
 const getParentsIdsFromPath = (path) => {
    if (!path) {
      return [];
    }
    return path.replace(/_/g, '-').split('.');
  };

  const getDirectParentId = (path) => {
    const ids = getParentsIdsFromPath(path);
    const parentIdx = ids.length - 2;
    if (parentIdx < 0) {
      return null;
    }
    return ids[parentIdx];
  };
  
  const { id, rootId } = useParams();
  const mainId = id || rootId;
  const { data: item, isLoading, isError } = hooks.useItem(mainId);
  const { t } = useTranslation();

  if (isLoading) {
    return Loader;
  }

  if (!item || isError) {
    return <Alert severity="error">{t('This item does not exist')}</Alert>;
  }

  const leftContent = item.get('name');
  const parentId = getDirectParentId(item.get('path')) || rootId;

  const content = !rootId ? (
    <Typography align="center" variant="h4">
      {t('No item defined.')}
    </Typography>
  ) : (
    <>
      <ItemHeader id={mainId} />
      <Item id={mainId} />
    </>
  );

  return (
    <Main
      open={Boolean(rootId)}
      sidebar={rootId && <MainMenu />}
      headerLeftContent={leftContent}
      headerRightContent={<HeaderRightContent id={mainId} />}
    >
      <PinnedItems content={content}>
        <Item id={parentId} pinnedOnly />
      </PinnedItems>
    </Main>
  );
};

MainScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ itemId: PropTypes.string }).isRequired,
  }).isRequired,
};

export default withRouter(MainScreen);
