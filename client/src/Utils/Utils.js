import * as JWT from 'jwt-decode';


export const getToken =() => {
  const isAuth = JSON.parse(sessionStorage.getItem('jwtoken')) ? true : false;
  return isAuth;
}