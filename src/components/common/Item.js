import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Loader, FileItem, DocumentItem, LinkItem, AppItem } from '@graasp/ui';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Api } from '@graasp/query-client';
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
import {
  API_HOST,
  HIDDEN_ITEM_TAG_ID,
  SCREEN_MAX_HEIGHT,
} from '../../config/constants';

const { useItem, useChildren, useFileContent, useCurrentMember, useItemTags } =
  hooks;

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
  const { data: itemTags, isLoading: isTagsLoading } = useItemTags(id);
  const { data: user, isLoading: isMemberLoading } = useCurrentMember();
  // fetch children if item is folder
  const isFolder = Boolean(item?.get('type') === ITEM_TYPES.FOLDER);
  const { data: children, isLoading: isChildrenLoading } = useChildren(id, {
    enabled: isFolder,
    getUpdates: isFolder,
  });

  // fetch file content if type is file
  const { data: content, isError: isFileError } = useFileContent(id, {
    enabled: Boolean(
      item && [ITEM_TYPES.FILE, ITEM_TYPES.S3_FILE].includes(item.get('type')),
    ),
  });

  if (isLoading || isTagsLoading || isChildrenLoading) {
    return <Loader />;
  }

  const isHidden =
    itemTags.filter(({ tagId }) => tagId === HIDDEN_ITEM_TAG_ID).size > 0;
  if (isHidden && isChildren) {
    return null;
  }

  if (isHidden) {
    return <Alert severity="error">{t('You cannnot access this item')}</Alert>;
  }

  if (isError || !item || isFileError) {
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
          {!showPinnedOnly && (
            <Typography className={FOLDER_NAME_TITLE_CLASS} variant="h4">
              {item.get('name')}
            </Typography>
          )}

          {children
            .filter((i) => showPinnedOnly === (i.settings?.isPinned || false))
            .map((thisItem) => (
              <Container key={thisItem.id} className={classes.container}>
                <Item isChildren id={thisItem.id} />
              </Container>
            ))}
        </Container>
      );
    case ITEM_TYPES.LINK:
      return <LinkItem item={item} height={SCREEN_MAX_HEIGHT} />;
    case ITEM_TYPES.FILE:
    case ITEM_TYPES.S3_FILE: {
      return (
        <FileItem
          id={buildFileId(id)}
          item={item}
          content={content}
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
          requestApiAccessToken={Api.requestApiAccessToken}
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
