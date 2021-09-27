import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Slide } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function PersistentDrawerRight({ children, sideContent }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <VisibilityIcon />
          </IconButton>

        <div className={classes.drawerHeader} />
        {children}
      </main>

      <Slide anchor="right" direction="left" in={open} mountOnEnter unmountOnExit>
        <Box className={classes.drawer}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          {sideContent}
        </Box>
      </Slide>
    </div>
  );
}

PersistentDrawerRight.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  sideContent: PropTypes.arrayOf(PropTypes.element).isRequired,
}