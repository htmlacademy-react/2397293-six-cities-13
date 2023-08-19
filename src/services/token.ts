const AUTH_TOKEN_KEY = 'six-sities';

export type Token = string;

const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
const saveToken = (token: Token) => localStorage.setItem(AUTH_TOKEN_KEY, token);
const dropToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export { getToken, saveToken, dropToken };
