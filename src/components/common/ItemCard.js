import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router';
import { ItemIcon } from '@graasp/ui';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import truncate from 'lodash.truncate';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { buildMainPath } from '../../config/paths';
import { ITEM_CARD_MAX_LENGTH } from '../../config/constants';

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  iconClass: {
    marginRight: theme.spacing(1),
  },
}));

const SimpleCard = ({ item }) => {
  const classes = useStyles();
  const { push } = useHistory();

  const onClick = () => {
    push(buildMainPath({ rootId: item.id, id: null }));
  };
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.title}>
            <ItemIcon
              type={item.type}
              extra={item.extra}
              name={item.name}
              iconClass={classes.iconClass}
            />
            {truncate(item.name, { length: ITEM_CARD_MAX_LENGTH })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

SimpleCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    extra: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default SimpleCard;
