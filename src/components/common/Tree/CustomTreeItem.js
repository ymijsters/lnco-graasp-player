/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from 'prop-types';
import { buildTreeItemClass } from '../../../config/selectors';
import { ITEM_TYPES } from '../../../enums';

const LoadingTreeItem = <Skeleton variant="text" />;

const CustomTreeItem = ({
  itemId,
  expandedItems = [],
  selectedId,
  useChildren,
  useItem,
  useTags,
  showItemFilter,
}) => {
  const { data: item, isLoading, isError } = useItem(itemId);
  const { data: tags, isLoading: isTagLoading } = useTags(itemId);

  const showItem = item && tags && showItemFilter?.(item, tags);
  const isExpanded = expandedItems?.includes(itemId);

  const { data: children, isLoading: childrenIsLoading } = useChildren(itemId, {
    enabled: Boolean(
      item && showItem && item.get('type') === ITEM_TYPES.FOLDER && isExpanded,
    ),
  });

  if (isLoading || isTagLoading) {
    return (
      <TreeItem
        nodeId={`loading-${itemId}`}
        key={itemId}
        label={LoadingTreeItem}
      />
    );
  }

  // display only folders
  if (!showItem || !item || isError) {
    return null;
  }

  const renderChildrenItems = () => {
    if (childrenIsLoading) {
      return LoadingTreeItem;
    }

    const filteredChildren = children?.filter((child) =>
      showItemFilter?.(child),
    );

    if (!filteredChildren?.size) {
      return null;
    }

    return filteredChildren.map(({ id: childId }) => (
      <CustomTreeItem
        key={childId}
        itemId={childId}
        expandedItems={expandedItems}
        selectedId={selectedId}
        useChildren={useChildren}
        useItem={useItem}
        useTags={useTags}
        showItemFilter={showItemFilter}
      />
    ));
  };

  const childrenTreeItems = renderChildrenItems();

  // render child with checkbox
  const content = childrenIsLoading ? LoadingTreeItem : <>{item.get('name')}</>;

  // recursive display of children
  return (
    <TreeItem
      key={itemId}
      nodeId={itemId}
      label={content}
      className={buildTreeItemClass(itemId)}
    >
      {childrenTreeItems}
    </TreeItem>
  );
};

CustomTreeItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  expandedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedId: PropTypes.string.isRequired,
  useChildren: PropTypes.any.isRequired,
  useItem: PropTypes.any.isRequired,
  useTags: PropTypes.any.isRequired,
  showItemFilter: PropTypes.any.isRequired,
};

export default CustomTreeItem;
