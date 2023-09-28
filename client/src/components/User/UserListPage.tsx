import React, { ReactElement } from 'react';
import { User } from '../../Models/User';
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UserSelected } from '../../Models/Interfaces';
import { FormatDate } from '../../Services/Utility';
import useSignedUser from '../../Services/useSignedUser';
export const ALL_USERS = gql`
  query Users {
    users {
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

const UserList = () => {
  const { signedInUser } = useSignedUser();
  const { data, error, refetch, loading } = useQuery(ALL_USERS, {
    context: {
      headers: {
        authorization: signedInUser.JWT_TOKEN
      }
    },
  });
  const navigate = useNavigate();

  const onSelectedUser = ( selectedUser: User ) => {
    refetch();
    navigate(`/users/${selectedUser.id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }
  const users = data.users;
  return<table className='table table-striped'><tbody>
    <tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Date of Birth</th>
    <th>Handicap</th>
    </tr>
  {
    users.map((eachUser:User): ReactElement => {
      return <UserListItem key={eachUser.id} selectedUser={ eachUser } onUserSelected={ onSelectedUser } />
    })
  }
  </tbody></table>
};


const UserListItem: React.FC<UserSelected> = ({ selectedUser, onUserSelected }) => {
  const onDetailsButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onUserSelected(selectedUser);
  }
  return <tr key={selectedUser.id}>
  <td><button className='btn btn-link' onClick={(e) => { onDetailsButtonClick(e) }}>Details</button></td>
  <td>{`${selectedUser.name}`}</td>
  <td>{`${selectedUser.gender}`}</td>
  <td>{`${FormatDate(selectedUser.date_of_birth)}`}</td>
  <td>{`${selectedUser.handicap}`}</td>
</tr>
}

function UserListPage() {
  return (
    <div className='container-fluid'>
        <h1>Users</h1>
        <div className='row g-3 align-items-center'>
          {
            <UserList />
          }
      </div>
    </div>
  );
}

export default UserListPage;