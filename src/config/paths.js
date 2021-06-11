export const HOME_PATH = '/';
export const buildMainPath = (
  { rootId, id } = { rootId: ':rootId', id: ':id' },
) => `/${rootId}/${id || ''}`;
