import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  Alert,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Context } from '@graasp/sdk';
import { Main } from '@graasp/ui';

import { ROOT_ID_PATH } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import { useItemContext } from '@/contexts/ItemContext';
import { LayoutContextProvider } from '@/contexts/LayoutContext';
import HeaderNavigation from '@/modules/header/HeaderNavigation';
import HeaderRightContent from '@/modules/header/HeaderRightContent';
import SideContent from '@/modules/rightPanel/SideContent';

import Item from './Item';
import ItemNavigation from './ItemNavigation';

const MainScreen = (): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rootId = useParams()[ROOT_ID_PATH];
  const { focusedItemId } = useItemContext();
  const mainId = focusedItemId || rootId;
  const { data: item, isLoading, isError } = hooks.useItem(mainId);
  const { t } = useTranslation();
  const [topItemName, setTopItemName] = useState('');
  const [isFirstItem, setIsFirstItem] = useState(true);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" />;
  }

  if (!item || isError) {
    // todo: add this to translations
    return <Alert severity="error">{t('This item does not exist')}</Alert>;
  }

  if (isFirstItem) {
    setTopItemName(item.name);
    setIsFirstItem(false);
  }

  const content = !rootId ? (
    <Typography align="center" variant="h4">
      {t('No item defined.')}
    </Typography>
  ) : (
    <Item id={mainId} />
  );

  return (
    <Main
      open={!isMobile && Boolean(rootId)}
      context={Context.Player}
      sidebar={<ItemNavigation />}
      headerLeftContent={
        <HeaderNavigation rootId={rootId} topItemName={topItemName} />
      }
      headerRightContent={<HeaderRightContent />}
    >
      <LayoutContextProvider>
        <SideContent item={item} content={content} />
      </LayoutContextProvider>
    </Main>
  );
};

export default MainScreen;
