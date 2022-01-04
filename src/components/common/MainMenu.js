import React, { useContext } from 'react';
import { useParams } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import {
  MainMenu as GraaspMainMenu,
  Loader,
} from '@graasp/ui';
import { MAIN_MENU_ID } from '../../config/selectors';
import { hooks } from '../../config/queryClient';
import { ITEM_TYPES } from '../../enums';
import { ItemContext } from '../context/ItemContext';
import DynamicTreeView from './Tree/Tree';
import { HIDDEN_ITEM_TAG_ID } from '../../config/constants';

const { useItem, useChildren, useItemTags } = hooks;

const MainMenu = () => {
  const { rootId } = useParams();
  const { t } = useTranslation();
  const { setFocusedItemId, focusedItemId } = useContext(ItemContext);

  const {
    data: rootItem,
    isLoading: rootItemIsLoading,
    isError: rootItemIsError,
  } = useItem(rootId);

  const isFolder = Boolean(
    rootItem && rootItem.get('type') === ITEM_TYPES.FOLDER,
  );
  const {
    data: children,
    isLoading,
    isError: childrenIsError,
  } = useChildren(rootId, {
    enabled: isFolder,
    getUpdates: isFolder,
  });

  // display nothing when no item is defined
  if (!rootId) {
    return null;
  }

  if (isLoading || rootItemIsLoading) {
    return <Loader />;
  }

  if (childrenIsError || rootItemIsError) {
    return <Alert severity="error">{t('An unexpected error occured.')}</Alert>;
  }

  return (
    <GraaspMainMenu id={MAIN_MENU_ID}>
      <DynamicTreeView
        rootLabel={rootItem.get('name')}
        rootId={rootId}
        useItem={useItem}
        useTags={useItemTags}
        useChildren={useChildren}
        initialExpendedItems={[rootId]}
        showItemFilter={(item, tags) => tags.filter(({ tagId }) => tagId === HIDDEN_ITEM_TAG_ID).size <= 0}
        selectedId={focusedItemId}
        onTreeItemSelect={(payload) => {
          setFocusedItemId(payload);
        }}
        items={children && !children.isEmpty() ? children : []}
      />
    </GraaspMainMenu>
  );
};

export default MainMenu;
