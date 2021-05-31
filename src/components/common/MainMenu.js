import React from 'react';
import { useHistory, useParams } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import {
  MainMenu as GraaspMainMenu,
  DynamicTreeView,
  Loader,
} from '@graasp/ui';
import { hooks } from '../../config/queryClient';

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
  const {
    data: children,
    isLoading,
    isError: childrenIsError,
  } = useChildren(rootId);

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
    <GraaspMainMenu>
      <DynamicTreeView
        rootLabel={rootItem.get('name')}
        rootId={rootId}
        useItem={useItem}
        useChildren={useChildren}
        initialExpendedItems={[rootId]}
        showCheckbox={false}
        showItemFilter={() => true}
        selectedId={id}
        onTreeItemSelect={(payload) => {
          push(`/${rootId}/${payload}`);
        }}
        shouldFetchChildrenForItem={() => true}
        isTreeItemDisabled={() => false}
        items={!children.isEmpty() ? children : []}
      />
    </GraaspMainMenu>
  );
};

export default MainMenu;
