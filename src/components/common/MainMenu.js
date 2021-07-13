import React from 'react';
import { useHistory, useParams } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import {
  MainMenu as GraaspMainMenu,
  DynamicTreeView,
  Loader,
} from '@graasp/ui';
import { buildTreeItemClass, MAIN_MENU_ID } from '../../config/selectors';
import { hooks, ws } from '../../config/queryClient';
import { ITEM_TYPES } from '../../enums';

const { useItem, useChildren } = hooks;

const MainMenu = () => {
  const { push } = useHistory();
  const { rootId, id } = useParams();
  const { t } = useTranslation();

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
  });
  ws.hooks.useChildrenUpdates(isFolder ? rootId : null);

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

  const useChildrenWithUpdates = (childId, ...args) => {
    const ret = useChildren(childId, ...args);
    ws.hooks.useChildrenUpdates(childId);
    return ret;
  };

  return (
    <GraaspMainMenu id={MAIN_MENU_ID}>
      <DynamicTreeView
        rootLabel={rootItem.get('name')}
        rootId={rootId}
        useItem={useItem}
        useChildren={useChildrenWithUpdates}
        buildTreeItemClass={(nodeId) => buildTreeItemClass(nodeId)}
        initialExpendedItems={[rootId]}
        showCheckbox={false}
        showItemFilter={() => true}
        selectedId={id}
        onTreeItemSelect={(payload) => {
          push(`/${rootId}/${payload}`);
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
