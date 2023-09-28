import { useState } from "react";
import { User } from "../../Models/User";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../Shared/UserForm";
import useSignedUser from "../../Services/useSignedUser";

export const SAVE_USER = gql`
  mutation UpdateUser($changedUser: UserInput!) {
    updateUser(changedUser: $changedUser) {
      id
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

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
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

function UserPage() {
  const navigate = useNavigate();
  const { signedInUser } = useSignedUser();
  const { id } = useParams()

  const [updateUser, changedUser] = useMutation(SAVE_USER, {
    context: {
      headers: {
        authorization: signedInUser.JWT_TOKEN
      }
    },
    update(cache, {data: {updateUser}}) {
      navigate("/users");
    }
  });

  const saveUser = (changedUser: User) => {
    try {
      updateUser({
        variables: { changedUser }
      });
    } catch {
      alert("Failed To Save User!!!");
    }
  }

  const LoadUser = () => {
    const { signedInUser } = useSignedUser();
    const { data, error, loading } = useQuery(GET_USER, {
      context: {
        headers: {
          authorization: signedInUser.JWT_TOKEN
        }
      },
      variables: { id },
    });

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error || !data) {
      return <div>ERROR</div>;
    }

    const retrievedUser = data.user;

    return <><UserForm selectedUser={ retrievedUser } onUserSelected={ saveUser } /></>
  }

  return (
    <div className='container-fluid'>
      { 
        id ? <>
        <h1>User</h1>
        <LoadUser />
      </>
      :
      <>
        <h1>User</h1>
        <p>Failed to load user!!!</p>
      </>
      }
    </div>
  );
}

export default UserPage;
