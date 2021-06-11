import React from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import { useHistory, useParams } from 'react-router';

const FolderButton = ({ id, item }) => {
  const { rootId } = useParams();
  const { push } = useHistory();

  const onClick = () => {
    push(`/${rootId}/${item.get('id')}`);
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
