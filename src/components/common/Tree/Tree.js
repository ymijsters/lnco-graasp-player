/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from 'prop-types';
import CustomTreeItem from './CustomTreeItem';

const DynamicTreeView = ({
  id,
  rootLabel,
  rootId,
  useItem,
  useTags,
  useChildren,
  initialExpendedItems = [],
  items,
  showItemFilter = () => true,
  selectedId,
  onTreeItemSelect,
}) => {
  const [expandedItems, setExpandedItems] = useState(initialExpendedItems);

  // types based on TreeView types
  const onSelect = (event, value) => onTreeItemSelect?.(value);

  // types based on TreeView types
  const onToggle = (event, nodeIds) => setExpandedItems(nodeIds);

  return (
    <TreeView
      id={id}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={onSelect}
      onNodeToggle={onToggle}
      expanded={expandedItems}
    >
      <TreeItem nodeId={rootId} label={rootLabel}>
        {items.map(({ id: itemId }) => (
          <CustomTreeItem
            key={itemId}
            itemId={itemId}
            expandedItems={expandedItems}
            selectedId={selectedId}
            useItem={useItem}
            useChildren={useChildren}
            useTags={useTags}
            showItemFilter={showItemFilter}
          />
        ))}
      </TreeItem>
    </TreeView>
  );
};

DynamicTreeView.propTypes = {
  id: PropTypes.string.isRequired,
  rootLabel: PropTypes.string.isRequired,
  rootId: PropTypes.string.isRequired,
  items: PropTypes.any.isRequired,
  initialExpendedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedId: PropTypes.string.isRequired,
  onTreeItemSelect: PropTypes.any.isRequired,
  useItem: PropTypes.any.isRequired,
  useTags: PropTypes.any.isRequired, 
  useChildren: PropTypes.any.isRequired,
  showItemFilter: PropTypes.any.isRequired,
};

export default DynamicTreeView;
