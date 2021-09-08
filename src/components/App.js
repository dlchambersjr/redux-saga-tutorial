import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsersRequests, createUserRequest, deleteUserRequest, usersError} from '../actions/users'
import UsersList from './UsersList'
import NewUserForm from './NewUserForm'
import {Alert} from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);

    this.props.getUsersRequests();
  }

  handleSubmit = ({firstName, lastName}) => {
    this.props.createUserRequest({firstName, lastName})
  }

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId)
  }

  handleCloseAlert = () => {
    this.props.usersError('')
  }

  render() {
    const users = this.props.users;

    return (
      <div style={{margin: '0 auto', padding: '20px', maxWidth:'600px'}}>
        <Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
          {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleSubmit}></NewUserForm>
        <UsersList onDeleteUser={this.handleDeleteUserClick} users={users.items}></UsersList>
      </div>
    );
  }
}

export default connect(({users}) => ({users}), {
  getUsersRequests,
  createUserRequest,
  deleteUserRequest,
  usersError
})(App);
