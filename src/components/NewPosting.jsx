import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Cancel, CheckCircle } from '@material-ui/icons';
import {app} from "../app/app";
import {get, put} from "../communication/Request";
import {postingsEndpoint, userListEndpoint, postingBlockEndpoint, userToken} from "../communication/endpoints/EndpointList";


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


class AddPosting extends React.Component {    
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        status: null,
        name: '',
        postings_list: [],
        user_list: [],
        errorMessage: ''
    };
  }

  async componentDidMount() {
    this.reloadPostingsList()
    this.reloadUserList()
  }

  async reloadPostingsList() {
    const token = userToken;
    const endpoint = postingsEndpoint;
    const response = await get(endpoint, token);
    this.setState({ status: response.status, loading: false});
    if (response.status == 200){
      let json = await response.json();
      let myList = json.message
      myList.sort((a,b) => (a.id_posting > b.id_posting) ? 1: -1)
      this.setState({ postings_list: myList});
    }
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

  postingDisplay(posting){
    let blockText = 'Block';
    let blockIcon = <Cancel />
    let blockColor = 'secondary'
    if (posting.blocked){
      blockText = 'Unblock';
      blockIcon = <CheckCircle />
      blockColor = 'primary'
    }
    let publicIcon = <Cancel />
    if (posting.public){
      publicIcon = <CheckCircle />
    }
    let deleteState = 'not deleted';
    if (posting.deleted){
      deleteState = 'deleted'
    }
    let location = 'Not specified.'
    if (posting.location){
      location = '(' + posting.location.x + ',' + posting.location.y + ')'
    }
    return (
      <TableRow key={posting.name}>
        <TableCell align="left" style={{fontWeight: 'bold'}}>{posting.name}</TableCell>
        <TableCell align="left">{posting.content}</TableCell>
        <TableCell align="left">{this.getUserName(posting.id_user)}</TableCell>
        <TableCell align="left">{this.formatDateAndTime(posting.creation_date)}</TableCell>
        <TableCell align="left">{this.formatDate(posting.start_date)} ~ {this.formatDate(posting.end_date)}</TableCell>
        <TableCell align="left">{posting.city}, {posting.country}</TableCell>
        <TableCell align="left">{location}</TableCell>
        <TableCell align="center">{posting.max_number_guests}</TableCell>
        <TableCell align="center">{posting.price_day}</TableCell>
        <TableCell align="center">{publicIcon}</TableCell>
        <TableCell align="center">{blockIcon}</TableCell>
        <TableCell align="center">
          <Button
              type="button"
              variant="contained"
              color={blockColor}
              onClick={() => this.setBlockState(posting.id_posting, !posting.blocked)}>
              {blockText}
          </Button>
        </TableCell>
      </TableRow>
    );
  }

  getUserName(user_id){
    let users = this.state.user_list.filter( function (user) { return user.id == user_id})
    if (users.length > 0) {
      let user = users[0]
      return user.first_name + ' ' + user.last_name
    }
    else{
      return 'unknown'
    }
  }

  splitDate(date_string){
    let date = {}
    date.year = date_string.substring(0,4)
    date.month = date_string.substring(5,7)
    date.day = date_string.substring(8,10)
    date.time = date_string.substring(11,19)
    return date
  }

  formatDate(date_string){
    let date = this.splitDate(date_string)
    return date.day + '/' + date.month + '/' + date.year
  }

  formatDateAndTime(date_string){
    let date = this.splitDate(date_string)
    return date.day + '/' + date.month + '/' + date.year + ' - ' + date.time
  }

  async setBlockState(posting_id, value) {
    const token = localStorage.getItem('token');
    const body = {"blocked": value}
    const endpoint = postingBlockEndpoint + posting_id;
    let response = await put(endpoint, body, token)
    this.setState({loading: true})
    this.reloadPostingsList()
  }


  render(){

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.postings_list.length > 0){
      return (
        <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Content</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="center">Creation</TableCell>
              <TableCell align="center">Duration</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Coordinates</TableCell>
              <TableCell align="center">Guests</TableCell>
              <TableCell align="center">PPD</TableCell>
              <TableCell align="center">Public?</TableCell>
              <TableCell align="center">Blocked?</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.postings_list.map(this.postingDisplay, this)}
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

AddPosting.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddPosting)