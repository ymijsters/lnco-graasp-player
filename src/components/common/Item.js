import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import {
  Loader,
  FileItem,
  DocumentItem,
  LinkItem,
  AppItem,
  S3FileItem,
} from '@graasp/ui';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { hooks } from '../../config/queryClient';
import ITEM_TYPES from '../../enums/itemTypes';
import FolderButton from './FolderButton';

const { useItem, useChildren, useFileContent, useS3FileContent } = hooks;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Item = ({ id, isChildren }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { data: item, isLoading, isError } = useItem(id);

  // fetch children if item is folder
  const { data: children, isLoading: isChildrenLoading } = useChildren(id, {
    enabled: item?.get('type') === ITEM_TYPES.FOLDER,
  });

  // fetch file content if type is file
  const { data: content } = useFileContent(id, {
    enabled: item && item.get('type') === ITEM_TYPES.FILE,
  });

  // fetch file content if type is s3File
  const { data: s3Content } = useS3FileContent(item?.get('id'), {
    enabled: item?.get('type') === ITEM_TYPES.S3_FILE,
  });

  // define a max height depending on the screen height
  // use a bit less of the height because of the header and some margin
  const maxHeight = window.innerHeight * 0.8;

  if (isLoading || isChildrenLoading) {
    return <Loader />;
  }

  if (isError || !item) {
    return <Alert severity="error">{t('An unexpected error occured.')}</Alert>;
  }

  switch (item.get('type')) {
    case ITEM_TYPES.FOLDER:
      // display only one level of a folder
      if (isChildren) {
        return <FolderButton item={item} />;
      }

      // render each children recursively
      return (
        <Container>
          <Typography variant="h2">{item.get('name')}</Typography>
          {children.map((thisItem) => (
            <Container className={classes.container}>
              <Item isChildren id={thisItem.id} />
            </Container>
          ))}
        </Container>
      );
    case ITEM_TYPES.LINK:
      return <LinkItem item={item} height={maxHeight} />;
    case ITEM_TYPES.FILE: {
      return <FileItem item={item} content={content} maxHeight={maxHeight} />;
    }
    case ITEM_TYPES.S3_FILE: {
      return (
        <S3FileItem item={item} content={s3Content} maxHeight={maxHeight} />
      );
    }
    case ITEM_TYPES.DOCUMENT: {
      return <DocumentItem item={item} readOnly />;
    }
    case ITEM_TYPES.APP: {
      return <AppItem item={item} readOnly />;
    }
    default:
      console.error(`The type ${item?.get('type')} is not defined`);
      return null;
  }
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  isChildren: PropTypes.bool,
};

Item.defaultProps = {
  isChildren: false,
};

export default Item;
