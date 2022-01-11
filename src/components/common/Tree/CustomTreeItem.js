import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from 'prop-types';
import { buildTreeItemClass } from '../../../config/selectors';
import { ITEM_TYPES } from '../../../enums';
import { hooks } from '../../../config/queryClient';
import { isHidden } from '../../../utils/item';

const { useItem, useItemTags, useItemsTags, useChildren } = hooks;

const LoadingTreeItem = <Skeleton variant="text" />;

const CustomTreeItem = ({
  itemId,
  expandedItems = [],
  selectedId,
}) => {
  const { data: item, isLoading, isError } = useItem(itemId);
  const { data: tags, isLoading: isTagLoading } = useItemTags(itemId);

  const showItem = item && tags && isHidden(tags.toJS());
  const isExpanded = expandedItems?.includes(itemId);

  const { data: children, isLoading: childrenIsLoading } = useChildren(itemId, {
    enabled: Boolean(
      item && showItem && item.get('type') === ITEM_TYPES.FOLDER && isExpanded,
    ),
  });
  const { data: childrenTags, isLoading: isChildrenTagsLoading } = useItemsTags(
    children?.map((child) => child.id).toJS(),
  );

  if (isLoading || isTagLoading) {
    return (
      <TreeItem
        nodeId={`loading-${itemId}`}
        key={itemId}
        label={LoadingTreeItem}
      />
    );
  }

  if (!showItem || !item || isError) {
    return null;
  }

  const renderChildrenItems = () => {
    if (childrenIsLoading || isChildrenTagsLoading) {
      return LoadingTreeItem;
    }

    const filteredChildren = children?.filter((_child, idx) =>
      isHidden(childrenTags.get(idx)),
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
      />
    ));
  };

  const content = childrenIsLoading ? LoadingTreeItem : item.get('name');

  // recursive display of children
  return (
    <TreeItem
      key={itemId}
      nodeId={itemId}
      label={content}
      className={buildTreeItemClass(itemId)}
    >
      {renderChildrenItems()}
    </TreeItem>
  );
};

CustomTreeItem.propTypes = {
  itemId: PropTypes.string.isRequired,
  expandedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default CustomTreeItem;
