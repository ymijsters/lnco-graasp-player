import { ITEM_TYPES } from '../../src/enums';
import { buildDocumentExtra } from '../../src/utils/itemExtra';
import { CURRENT_USER } from './members';

// eslint-disable-next-line import/prefer-default-export
export const GRAASP_DOCUMENT_ITEM = {
  id: 'ecafbd2a-5688-12eb-ae91-0242ac130002',
  type: ITEM_TYPES.DOCUMENT,
  name: 'graasp text',
  description: 'a description for graasp text',
  path: 'ecafbd2a_5688_12eb_ae93_0242ac130002',
  creator: CURRENT_USER.id,
  extra: buildDocumentExtra({
    content: '<h1>Some Title</h1>',
  }),
  settings: {
    isPinned: false,
    showChatbox: false,
  },
  tags: [],
};
