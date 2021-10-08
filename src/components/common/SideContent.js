import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import PushPinIcon from '@material-ui/icons/PushPin';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Box, Paper, Slide } from '@material-ui/core';
import { Map } from 'immutable';
import Chatbox from "./Chatbox";
import { HEADER_HEIGHT } from '../../config/constants';
import { LayoutContext } from '../context/LayoutContext';
import Item from './Item';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  iconButton:{
    float: 'right'
  },
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
    // necessary for content to be below app bar
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

export default function SideContent({ children, item }) {

  const getDirectParentId = (path) => {
    const ids = path.replace(/_/g, '-').split('.');
    const parentIdx = ids.length - 2;
    return ids[parentIdx];
  };

  const parentId = getDirectParentId(item.get('path')) || item.get('path');

  const { 
    isPinnedMenuOpen,
    setIsPinnedMenuOpen,
    isChatboxMenuOpen,
    setIsChatboxMenuOpen
  } = useContext(LayoutContext);

  const classes = useStyles();
  const theme = useTheme();

  const toggleChatOpen = () => {
    setIsChatboxMenuOpen(!isChatboxMenuOpen);
    setIsPinnedMenuOpen(false);
  };

  const togglePinnedOpen = () => {
    setIsPinnedMenuOpen(!isPinnedMenuOpen);
    setIsChatboxMenuOpen(false)
  };

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: (isChatboxMenuOpen || isPinnedMenuOpen),
        })}
      >
        <IconButton
          className={classes.iconButton}
          aria-label="open drawer"
          onClick={toggleChatOpen}
        > 
          <ForumIcon />
        </IconButton>

        <IconButton
          className={classes.iconButton}
          aria-label={ isPinnedMenuOpen ? "Hide pinned items" : "Show pinned items"}
          onClick={togglePinnedOpen}
        >
          <PushPinIcon />
        </IconButton>

        {children}
      </main>

      <Paper square>
        <Slide anchor="right" direction="left" in={isChatboxMenuOpen} mountOnEnter unmountOnExit minHeight={window.innerHeight - HEADER_HEIGHT}>  
          <Box className={classes.drawer}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={toggleChatOpen}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
              <Chatbox item={item} />
           </Box>
        </Slide>
      </Paper>

      <Paper square>
        <Slide anchor="right" direction="left" in={isPinnedMenuOpen} mountOnEnter unmountOnExit minHeight={window.innerHeight - HEADER_HEIGHT}>  
          <Box className={classes.drawer}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={togglePinnedOpen}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
              <Item id={parentId} pinnedOnly />
           </Box>
        </Slide>
      </Paper>
    </div>
  ); 
}

SideContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  item: PropTypes.instanceOf(Map).isRequired,
}
