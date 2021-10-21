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
import { ITEM_TYPES } from '../../enums';
import FolderButton from './FolderButton';
import {
  buildAppId,
  buildDocumentId,
  buildFileId,
  buildFolderButtonId,
  FOLDER_NAME_TITLE_CLASS,
} from '../../config/selectors';
import { API_HOST, SCREEN_MAX_HEIGHT } from '../../config/constants';

const {
  useItem,
  useChildren,
  useFileContent,
  useS3FileContent,
  useCurrentMember,
} = hooks;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Item = ({ id, isChildren, showPinnedOnly }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { data: item, isLoading, isError } = useItem(id);
  const { data: user, isLoading: isMemberLoading } = useCurrentMember();

  // fetch children if item is folder
  const isFolder = Boolean(item?.get('type') === ITEM_TYPES.FOLDER);
  const { data: children, isLoading: isChildrenLoading } = useChildren(id, {
    enabled: isFolder,
    getUpdates: isFolder,
  });

  // fetch file content if type is file
  const { data: content, isError: isFileError } = useFileContent(id, {
    enabled: Boolean(item && item.get('type') === ITEM_TYPES.FILE),
  });

  // fetch file content if type is s3File
  const { data: s3Content, isError: isS3FileError } = useS3FileContent(
    item?.get('id'),
    {
      enabled: Boolean(item?.get('type') === ITEM_TYPES.S3_FILE),
    },
  );

  if (isLoading || isChildrenLoading) {
    return <Loader />;
  }

  if (isError || !item || isFileError || isS3FileError) {
    return <Alert severity="error">{t('An unexpected error occured.')}</Alert>;
  }

  switch (item.get('type')) {
    case ITEM_TYPES.FOLDER:
      // display only one level of a folder
      if (isChildren) {
        return <FolderButton id={buildFolderButtonId(id)} item={item} />;
      }

      // render each children recursively
      return (
        <Container>
          <Typography className={FOLDER_NAME_TITLE_CLASS} variant="h2">
            {item.get('name')}
          </Typography>
          {children
            .filter(
              (i) =>
                (showPinnedOnly && i.settings?.isPinned) || !showPinnedOnly,
            )
            .map((thisItem) => (
              <Container key={thisItem.id} className={classes.container}>
                <Item isChildren id={thisItem.id} />
              </Container>
            ))}
        </Container>
      );
    case ITEM_TYPES.LINK:
      return <LinkItem item={item} height={SCREEN_MAX_HEIGHT} />;
    case ITEM_TYPES.FILE: {
      return (
        <FileItem
          id={buildFileId(id)}
          item={item}
          content={content}
          maxHeight={SCREEN_MAX_HEIGHT}
        />
      );
    }
    case ITEM_TYPES.S3_FILE: {
      return (
        <S3FileItem
          item={item}
          content={s3Content}
          maxHeight={SCREEN_MAX_HEIGHT}
        />
      );
    }
    case ITEM_TYPES.DOCUMENT: {
      return <DocumentItem id={buildDocumentId(id)} item={item} readOnly />;
    }
    case ITEM_TYPES.APP: {
      if (isMemberLoading) {
        return <Loader />;
      }

      return (
        <AppItem
          id={buildAppId(id)}
          item={item}
          apiHost={API_HOST} // todo: to change
          user={user}
        />
      );
    }
    default:
      console.error(`The type ${item?.get('type')} is not defined`);
      return null;
  }
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  isChildren: PropTypes.bool,
  showPinnedOnly: PropTypes.bool,
};

Item.defaultProps = {
  isChildren: false,
  showPinnedOnly: false,
};

export default Item;
