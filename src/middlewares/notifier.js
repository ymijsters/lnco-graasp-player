import { toastr } from 'react-redux-toastr';
import i18n from '../config/i18n';
import {
  ERROR_MESSAGE_HEADER,
  SUCCESS_MESSAGE_HEADER,
} from '../config/messages';

export default ({ type, payload }) => {
  const message = null;
  switch (type) {
    // error messages

    // progress messages
    default:
  }

  // error notification
  if (payload?.error && message) {
    toastr.error(i18n.t(ERROR_MESSAGE_HEADER), i18n.t(message));
  }
  // success notification
  else if (message) {
    toastr.success(i18n.t(SUCCESS_MESSAGE_HEADER), i18n.t(message));
  }
};
