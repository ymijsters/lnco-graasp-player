import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { PermissionedComponent, Loader } from '@graasp/ui';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { hooks } from '../../config/queryClient';
import { buildGraaspComposeItemRoute } from '../../config/constants';
import { isRegularUser } from '../../utils/user';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(1),
  },
}));

const ItemHeader = ({ id }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { data: user, isLoading } = hooks.useCurrentMember();

  const onClickComposeView = () => {
    window.location.href = buildGraaspComposeItemRoute(id);
  };

  if (isLoading) {
    <Loader />;
  }

  const ComposeViewButton = (
    <Tooltip title={t('Compose View')}>
      <IconButton color="primary" onClick={onClickComposeView}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Grid container justify="flex-end" className={classes.wrapper}>
      <Grid item>
        <PermissionedComponent
          component={ComposeViewButton}
          checkPermissions={() => isRegularUser(user)}
        />
      </Grid>
    </Grid>
  );
};

ItemHeader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemHeader;
