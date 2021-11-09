import React, { useContext } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import { ItemContext } from '../context/ItemContext';

const FolderButton = ({ id, item }) => {
  const { setFocusedItemId } = useContext(ItemContext);

  const onClick = () => {
    setFocusedItemId(item.get('id'));
  };

  return (
    <Button
      id={id}
      variant="outlined"
      size="large"
      color="primary"
      onClick={onClick}
      startIcon={<FolderIcon />}
    >
      {`Navigate to ${item.get('name')}`}
    </Button>
  );
};

FolderButton.propTypes = {
  id: PropTypes.string,
  item: PropTypes.instanceOf(Map).isRequired,
};

FolderButton.defaultProps = {
  id: null,
};

export default FolderButton;
