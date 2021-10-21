import React, { useContext } from 'react';
import { useParams } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import {
  MainMenu as GraaspMainMenu,
  DynamicTreeView,
  Loader,
} from '@graasp/ui';
import { buildTreeItemClass, MAIN_MENU_ID } from '../../config/selectors';
import { hooks } from '../../config/queryClient';
import { ITEM_TYPES } from '../../enums';
import { ItemContext } from '../context/ItemContext';

const { useItem, useChildren } = hooks;

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
        useChildren={useChildren}
        buildTreeItemClass={(nodeId) => buildTreeItemClass(nodeId)}
        initialExpendedItems={[rootId]}
        showCheckbox={false}
        showItemFilter={() => true}
        selectedId={focusedItemId}
        onTreeItemSelect={(payload) => {
          setFocusedItemId(payload);
        }}
        shouldFetchChildrenForItem={(item) =>
          item.get('type') === ITEM_TYPES.FOLDER
        }
        isTreeItemDisabled={() => false}
        items={children && !children.isEmpty() ? children : []}
      />
    </GraaspMainMenu>
  );
};

export default MainMenu;
