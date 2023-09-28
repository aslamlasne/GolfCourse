import { useState } from 'react';
import { User } from '../../Models/User';
import { gql, useMutation } from "@apollo/client";
import UserSigninForm from '../Shared/UserSigninForm';
import { SigninUser } from '../../Models/SigninUser';
import { UserSignedIn } from '../../Models/Interfaces';

export const SIGNIN_USER = gql`
  mutation SignTheUser($signInInfo: SignInInput!) {
    signInUser(signInInfo: $signInInfo) {
      user {
        name,
        email,
        username
      }
      authenticated
      JWT_TOKEN
    }
  }
`;

const SignInPage: React.FC<UserSignedIn> = ( { onUserSignedIn } ) => {

  const [signInUser] = useMutation(SIGNIN_USER, {
    update(cache, {data: { signInUser }}) {
      onUserSignedIn(signInUser);
    }
  });

  const onSignInUser = (signInInfo: SigninUser) => {
    try {
      signInUser({
        variables: { signInInfo }
      });
    } catch {
      alert("Failed To Sign In User!!!");
    }
  }
  
  return (
    <UserSigninForm onUserSignIn={ onSignInUser } />
  );
}

export default SignInPage;