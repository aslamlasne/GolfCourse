import { useState } from 'react';
import { SignedinUser } from '../Models/SignedinUser';

export default function useSignedUser() {
  const getSignedUser = () => {
    const userFromStorage = sessionStorage.getItem('userFromStorage');
    let user: SignedinUser = {
      user: null,
      authenticated: false,
      JWT_TOKEN: ''
    };
    if (typeof userFromStorage !== 'undefined' && userFromStorage && userFromStorage !== 'undefined') {
      user = JSON.parse(userFromStorage);
    }
     return user;
 
  };

  const [signedInUser, setUser] = useState(getSignedUser());

  const setSignedUser = (user: SignedinUser)  => {
    sessionStorage.setItem('userFromStorage', JSON.stringify(user));
    setUser(user);
  };

  return {
    setSignedInUser: setSignedUser,
    signedInUser
  }
}