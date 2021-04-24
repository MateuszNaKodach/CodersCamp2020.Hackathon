import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function authenticated(props: { token: string; email: string }) {
  cookies.set('authenticationToken', JSON.stringify({ type: 'Google', value: props.token }));
  cookies.set('currentUser', JSON.stringify({ email: props.email }));
}

export function unauthenticated() {
  cookies.remove('authenticationToken');
  cookies.remove('currentUser');
}
