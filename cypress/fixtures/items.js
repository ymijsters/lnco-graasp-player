import { ITEM_TYPES } from '../../src/enums';
import { CURRENT_USER } from './members';

export const DEFAULT_FOLDER_ITEM = {
  description: '',
  extra: {},
  creator: CURRENT_USER.id,
  type: ITEM_TYPES.FOLDER,
  settings: {
    isPinned: false,
    showChatbox: false,
  },
};

export const ITEM_WITH_CHAT_BOX = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'ecafbd2a-5688-11eb-ae93-0242ac130002',
  name: 'parent folder',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002',
  settings: {
    isPinned: false,
    showChatbox: true,
  },
};

export const ITEM_WITHOUT_CHAT_BOX = {
  ...DEFAULT_FOLDER_ITEM,
  id: 'fdf09f5a-5688-11eb-ae93-0242ac130003',
  name: 'child folder',
  path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130003',
  settings: {
    isPinned: false,
    showChatbox: false,
  },
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
      settings: {
        isPinned: false,
        showChatbox: false,
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
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130004',
      name: 'child folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130002.fdf09f5a_5688_11eb_ae93_0242ac130004',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
  ],
};

export const FOLDER_WITH_PINNED_ITEMS = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130005',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      type: ITEM_TYPES.LINK,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130006',
      name: 'NOT PINNED',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130006',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130007',
      name: 'PINNED',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130005.fdf09f5a_5688_11eb_ae93_0242ac130007',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: true,
        showChatbox: false,
      },
    },
  ],
};

export const FOLDER_WITH_HIDDEN_ITEMS = {
  items: [
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'ecafbd2a-5688-11eb-ae93-0242ac130008',
      name: 'parent folder',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130008',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130009',
      name: 'Visible',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130008.fdf09f5a_5688_11eb_ae93_0242ac130009',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
    },
    {
      ...DEFAULT_FOLDER_ITEM,
      id: 'fdf09f5a-5688-11eb-ae93-0242ac130010',
      name: 'Hidden',
      path: 'ecafbd2a_5688_11eb_ae93_0242ac130008.fdf09f5a_5688_11eb_ae93_0242ac130010',
      extra: {
        image: 'someimageurl',
      },
      settings: {
        isPinned: false,
        showChatbox: false,
      },
      tags: [
        {
          tagId: '12345678-1234-1234-1234-123456789012',
        }
      ],
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
  settings: {
    isPinned: false,
    showChatbox: false,
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
  settings: {
    isPinned: false,
    showChatbox: false,
  },
};
