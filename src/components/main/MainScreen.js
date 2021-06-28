import React from 'react';
import { Loader, Main, PermissionedComponent } from '@graasp/ui';
import { IconButton, Typography, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, withRouter } from 'react-router';
import MainMenu from '../common/MainMenu';
import Item from '../common/Item';
import { hooks } from '../../config/queryClient';
import { isRegularUser } from '../../utils/user';
import { buildGraaspComposeItemRoute } from '../../config/constants';

const MainScreen = () => {
  const { id, rootId } = useParams();
  const mainId = id || rootId;
  const { data: item, isLoading } = hooks.useItem(mainId);
  const { data: user, isLoadingMember } = hooks.useCurrentMember();
  const { t } = useTranslation();

  if (isLoading || isLoadingMember) {
    return Loader;
  }

  if (!item) {
    return <Alert severity="error">{t('This item does not exist')}</Alert>;
  }

  const onClickComposeView = () => {
    window.location.href = buildGraaspComposeItemRoute(mainId);
  };

  const leftContent = item.get('name');
  const rightContent = (
    <PermissionedComponent
      component={
        <Tooltip title={t('Compose View')}>
          <IconButton color="secondary" onClick={onClickComposeView}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      }
      checkPermissions={() => isRegularUser(user)}
    />
  );

  const content = !rootId ? (
    <Typography align="center" variant="h4">
      {t('No item defined.')}
    </Typography>
  ) : (
    <Item id={mainId} />
  );

  return (
    <Main
      open={Boolean(rootId)}
      sidebar={rootId && <MainMenu />}
      headerLeftContent={leftContent}
      headerRightContent={rightContent}
    >
      {content}
    </Main>
  );
};

MainScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ itemId: PropTypes.string }).isRequired,
  }).isRequired,
};

export default withRouter(MainScreen);
