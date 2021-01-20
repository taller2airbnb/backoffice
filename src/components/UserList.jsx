import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Cancel, CheckCircle } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {app} from "../app/app";
import {get, put} from "../communication/Request";
import {userListEndpoint, userToken} from "../communication/endpoints/EndpointList"


const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});


class UserList extends React.Component {    
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        status: null,
        name: '',
        user_list: [],
        errorMessage: ''
    };
  }

  async componentDidMount() {
    this.reloadUserList()
  }

  async reloadUserList() {
    const token = userToken;
    const endpoint = userListEndpoint;
    const response = await get(endpoint, token);
    this.setState({ status: response.status, loading: false});
    if (response.status == 200){
      let json = await response.json();
      let myList = json.message.users
      myList.sort((a,b) => (a.id > b.id) ? 1: -1)
      this.setState({ user_list: json.message.users});
    }
  }


  listAUser(user){
    let blockText = 'Block';
    let blockIcon = <Cancel />
    let blockColor = 'secondary'
    if (user.blocked){
      blockText = 'Unblock';
      blockIcon = <CheckCircle />
      blockColor = 'primary'
    }
    return (
      <TableRow key={user.name}>
        <TableCell align="left" style={{fontWeight: 'bold'}}>{user.first_name} {user.last_name}</TableCell>
        <TableCell align="left">{user.alias}</TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">{user.national_id_type} {user.national_id}</TableCell>
        <TableCell align="center">{user.id}</TableCell>
        <TableCell align="center">{blockIcon}</TableCell>
        <TableCell align="center">
          <Button style={{ marginLeft: '2rem', marginBottom: '1.2rem' }}
              type="button"
              variant="contained"
              color={blockColor}
              onClick={() => this.setBlockStatus(user.id, !user.blocked)}>
              {blockText}
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  async setBlockStatus(user_id, new_status) {
    const token = userToken;
    const body = {"new_status": new_status}
    const endpoint = userListEndpoint + "/" + user_id + "/blocked_status";
    let response = await put(endpoint, body, token)
    this.setState({loading: true})
    this.reloadUserList()
  }

  render(){

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.user_list.length > 0){
      return (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Alias</TableCell>
                <TableCell align="center">Mail</TableCell>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Key</TableCell>
                <TableCell align="center">Blocked?</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.user_list.map(this.listAUser, this)}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <div>
        <div>Status: {this.state.status}</div>
        <div>{this.state.name}</div>
        <div>{localStorage.getItem("token")}</div>
      </div>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);