import { useState } from 'react';
import { User } from '../../Models/User';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import UserForm from '../Shared/UserForm';

export const SIGNUP_USER = gql`
  mutation SignUpUser($newUser: UserInput) {
    signUpUser(newUser: $newUser) {
      name
      password
      username
      handicap
      gender
      email
      date_of_birth
      calculated_on
    }
  }
`;

function SignUpPage() {
  const navigate = useNavigate();
  const user = new User();

  const [signupUser, newUser] = useMutation(SIGNUP_USER, {
    update(cache, {data: {addedUser}}) {
      navigate("/home");
    }
  });

  const saveUser = (newUser: User) => {
    try {
      signupUser({
        variables: { newUser }
      });
    } catch {
      alert("Failed To Add User!!!");
    }
  }
  return (
    <UserForm selectedUser={ user } onUserSelected={ saveUser }/>
  );
}

export default SignUpPage;