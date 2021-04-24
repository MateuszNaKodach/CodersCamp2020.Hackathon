import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const getAuthorizationTokenValue = () => `${cookies.get('authenticationToken').value}`;
export const getAuthorizedUserId = () => `${cookies.get('currentUser').userId}`;
