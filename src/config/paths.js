export const HOME_PATH = '/';
export const buildMainPath = ({ rootId = ':rootId', id = ':id' } = {}) =>
  `/${rootId}/${id || ''}`;
