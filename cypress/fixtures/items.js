import { ITEM_TYPES } from '../../src/enums';
import { CURRENT_USER } from './members';

export const DEFAULT_FOLDER_ITEM = {
  description: '',
  extra: {},
  creator: CURRENT_USER.id,
  type: ITEM_TYPES.FOLDER,
};

export const FOLDER_WITH_SUBFOLDER_ITEM = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
      extra: {
        image: 'someimageurl',
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
      name: 'child folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
      extra: {
        image: 'someimageurl',
      },
    },
  ],
};

export const SHORTCUT = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'gcafbd2a-5688-11eb-ae92-0242ac130002',
  name: 'shortcut for own_item_name1',
  path: 'gcafbd2a_5688_11eb_ae92_0242ac130002',
  type: ITEM_TYPES.SHORTCUT,
  extra: {
    image: 'someimageurl',
  },
};

export const FOLDER_FIXTURE = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'gcefbd2a-5688-11eb-ae92-0242ac130002',
  name: 'folder',
  path: 'gcefbd2a_5688_11eb_ae92_0242ac130002',
  type: ITEM_TYPES.FOLDER,
  extra: {
    image: 'someimageurl',
  },
};
