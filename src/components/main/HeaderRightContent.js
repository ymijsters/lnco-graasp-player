import React from 'react';
import { HeaderUserInformation } from '@graasp/ui';
import { useTranslation } from 'react-i18next';
import { hooks } from '../../config/queryClient';

const HeaderRightContent = () => {
  const { t } = useTranslation();
  const { data: user, isLoading } = hooks.useCurrentMember();

  return (
    <HeaderUserInformation
      username={user?.get('name')}
      avatar={user?.get('extra')?.avatar}
      isLoading={isLoading}
      noUsernameMessage={t('You are not signed in.')}
    />
  );
};

export default HeaderRightContent;
