import qs from 'querystring';

// eslint-disable-next-line import/prefer-default-export
export function buildSignInPath(to) {
  const queryString = qs.stringify({ to }, { addQueryPrefix: true });
  return `signin${queryString}`;
}
