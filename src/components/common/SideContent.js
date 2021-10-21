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
import { useTranslation } from 'react-i18next';
import Chatbox from './Chatbox';
import { HEADER_HEIGHT, DRAWER_WIDTH } from '../../config/constants';
import { LayoutContext } from '../context/LayoutContext';
import Item from './Item';
import {
  ITEM_CHATBOX_BUTTON_ID,
  PANNEL_CLOSE_BUTTON_ID,
  ITEM_PINNED_BUTTON_ID,
  ITEM_PINNED_ID,
} from '../../config/selectors';
import { getDirectParentId } from '../../utils/item';
import { ITEM_TYPES } from '../../enums';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    float: 'right',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    width: DRAWER_WIDTH,
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

const SideContent = ({ children, item }) => {
  const parentId =
    (item.get('type') !== ITEM_TYPES.FOLDER &&
      getDirectParentId(item.get('path'))) ||
    item.get('id');
  const settings = item.get('settings');

  const {
    isPinnedMenuOpen,
    setIsPinnedMenuOpen,
    isChatboxMenuOpen,
    setIsChatboxMenuOpen,
  } = useContext(LayoutContext);

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const toggleChatOpen = () => {
    setIsChatboxMenuOpen(!isChatboxMenuOpen);
    setIsPinnedMenuOpen(false);
  };

  const togglePinnedOpen = () => {
    setIsPinnedMenuOpen(!isPinnedMenuOpen);
    setIsChatboxMenuOpen(false);
  };

  const diplayChatButton = () => {
    if (!settings?.showChatbox) return null;

    return (
      <IconButton
        id={ITEM_CHATBOX_BUTTON_ID}
        className={classes.iconButton}
        aria-label={isChatboxMenuOpen ? t('Hide Chat') : t('Show Chat')}
        onClick={toggleChatOpen}
      >
        <ForumIcon />
      </IconButton>
    );
  };

  const displayChatbox = () => {
    if (!settings?.showChatbox) return null;
    
    return (
      <Paper square>
        <Slide
          anchor="right"
          direction="left"
          in={isChatboxMenuOpen}
          mountOnEnter
          unmountOnExit
          minHeight={window.innerHeight - HEADER_HEIGHT}
        >
          <Box className={classes.drawer}>
            <div className={classes.drawerHeader}>
              <IconButton id={PANNEL_CLOSE_BUTTON_ID} onClick={toggleChatOpen}>
                {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Chatbox item={item} />
          </Box>
        </Slide>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isChatboxMenuOpen || isPinnedMenuOpen,
        })}
      >
        {diplayChatButton()}

        <IconButton
          id={ITEM_PINNED_BUTTON_ID}
          className={classes.iconButton}
          aria-label={
            isPinnedMenuOpen ? t('Hide Pinned Items') : t('Show Pinned Items')
          }
          onClick={togglePinnedOpen}
        >
          <PushPinIcon />
        </IconButton>

        {children}
      </main>

      {displayChatbox()}

      <Paper square>
        <Slide
          anchor="right"
          direction="left"
          in={isPinnedMenuOpen}
          mountOnEnter
          unmountOnExit
          minHeight={window.innerHeight - HEADER_HEIGHT}
          id={ITEM_PINNED_ID}
        >
          <Box className={classes.drawer}>
            <div className={classes.drawerHeader}>
              <IconButton
                id={PANNEL_CLOSE_BUTTON_ID}
                onClick={togglePinnedOpen}
              >
                {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Item id={parentId} showPinnedOnly />
          </Box>
        </Slide>
      </Paper>
    </div>
  );
};

SideContent.propTypes = {
  children: PropTypes.element.isRequired,
  item: PropTypes.instanceOf(Map).isRequired,
};

export default SideContent;
