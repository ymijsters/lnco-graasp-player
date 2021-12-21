import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Main,
  MainMenu as GraaspMainMenu,
  DynamicTreeView,
  Loader,
} from '@graasp/ui';
import { Divider, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router';
import HeaderRightContent from './HeaderRightContent';
import { hooks } from '../../config/queryClient';
import { buildTreeItemClass } from '../../config/selectors';
import ItemCard from '../common/ItemCard';
import { buildMainPath } from '../../config/paths';

const { useItem, useOwnItems, useChildren, useSharedItems, useItemsTags } = hooks;

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();

  const { data: ownItems, isLoading: isLoadingOwnItems } = useOwnItems();
  const { data: ownItemsTags } = useItemsTags(ownItems?.map(({ id }) => id).toJS())
  const { data: sharedItems, isLoading: isLoadingSharedItems } = useSharedItems();

  const filtred = ownItems.filter((item, idx) => ownItemsTags[idx].filter(({ tagId }) => tagId === 'b5373e38-e89b-4dc7-b4b9-fd3601504467').size <= 0);

  console.log(ownItems);
  console.log(ownItemsTags);
  console.log(filtred);

  const renderSharedItems = () => {
    if (isLoadingSharedItems) {
      return <Loader />;
    }

    if (!sharedItems?.size) {
      return null;
    }

    return (
      <>
        <Divider className={classes.divider} />
        <Typography variant="h4">{t('Shared Items')}</Typography>
        <Grid container spacing={3} justify="center">
          {sharedItems.map((i) => (
            <Grid item lg={3} md={4} sm={6}>
              <ItemCard item={i} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderOwnItems = () => {
    if (isLoadingOwnItems) {
      return <Loader />;
    }

    if (!ownItems?.size) {
      return null;
    }

    return (
      <>
        <Typography variant="h4">{t('My Items')}</Typography>
        <Grid container spacing={3} justify="center">
          {ownItems.map((i) => (
            <Grid item lg={3} md={4} sm={6}>
              <ItemCard item={i} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderContent = () => (
    <Container>
      {renderOwnItems()}
      {renderSharedItems()}
    </Container>
  );

  const renderOwnItemsMenu = () => {
    const rootOwnId = 'own';

    if (isLoadingOwnItems) {
      return <Loader />;
    }

    if (!ownItems?.size) {
      return null;
    }

    return (
      <GraaspMainMenu>
        <DynamicTreeView
          rootLabel={t('My Items')}
          rootId={rootOwnId}
          useItem={useItem}
          buildTreeItemClass={(nodeId) => buildTreeItemClass(nodeId)}
          initialExpendedItems={[]}
          showCheckbox={false}
          showItemFilter={() => true}
          onTreeItemSelect={(payload) => {
            if (payload !== rootOwnId) {
              navigate(buildMainPath({ rootId: payload, id: null }));
            }
          }}
          useChildren={useChildren}
          shouldFetchChildrenForItem={() => false}
          isTreeItemDisabled={() => false}
          items={ownItems}
        />
      </GraaspMainMenu>
    );
  };

  const renderSharedItemsMenu = () => {
    const rootSharedId = 'shared';

    if (isLoadingSharedItems) {
      return <Loader />;
    }

    if (!sharedItems?.size) {
      return null;
    }

    return (
      <GraaspMainMenu>
        <DynamicTreeView
          rootLabel={t('Shared Items')}
          rootId={rootSharedId}
          useItem={useItem}
          buildTreeItemClass={(nodeId) => buildTreeItemClass(nodeId)}
          initialExpendedItems={[]}
          showCheckbox={false}
          showItemFilter={() => true /* ownItemsTags[0].filter(({ tagId }) => tagId === 'b5373e38-e89b-4dc7-b4b9-fd3601504467').size <= 0 */ }
          onTreeItemSelect={(payload) => {
            if (payload !== rootSharedId) {
              navigate(buildMainPath({ rootId: payload, id: null }));
            }
          }}
          useChildren={useChildren}
          shouldFetchChildrenForItem={() => true}
          isTreeItemDisabled={() => false}
          items={sharedItems}
        />
      </GraaspMainMenu>
    );
  };

  const sidebar = (
    <>
      {renderOwnItemsMenu()}
      {renderSharedItemsMenu()}
    </>
  );

  return (
    <Main
      open
      sidebar={sidebar}
      headerLeftContent={t('Graasp Player')}
      headerRightContent={<HeaderRightContent />}
    >
      {renderContent()}
    </Main>
  );
};

export default Home;
