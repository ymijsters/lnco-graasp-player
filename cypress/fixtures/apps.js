import { ITEM_TYPES } from '../../src/enums';
import { CURRENT_USER } from './members';

// mock an app with the graasp link
// eslint-disable-next-line import/prefer-default-export
export const GRAASP_APP_ITEM = {
  id: 'baefbd2a-5688-11eb-ae91-0242ac130002',
  type: ITEM_TYPES.APP,
  name: 'graasp app',
  description: 'a description for graasp app',
  path: 'baefbd2a_5688_11eb_ae93_0242ac130002',
  creator: CURRENT_USER.id,
  extra: {
    app: { url: 'https://graasp.eu' },
  },
  settings: {
    isPinned: false,
    showChat: false,
  }
};
