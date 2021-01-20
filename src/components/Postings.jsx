import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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


class PostingsList extends React.Component {    
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
    let blockState = 'not blocked'
    if (posting.blocked){
      blockText = 'Unblock';
      blockState = 'blocked'
    }
    let publicState = 'Private';
    if (posting.public){
      publicState = 'Public'
    }
    let deleteState = 'not deleted';
    if (posting.deleted){
      deleteState = 'deleted'
    }
    let location = 'Exact coordinates not specified.'
    if (posting.location){
      location = 'Coordinates: (' + posting.location.x + ',' + posting.location.y + ')'
    }
    return (
        <div>
          <div style={{fontWeight: 'bold'}}>{posting.name}</div>
          <div style={{ marginLeft: '2rem'}}>
            "{posting.content}"
          </div>
          <div style={{ marginLeft: '2rem'}}>
            Posted by {this.getUserName(posting.id_user)} at {this.formatDateAndTime(posting.creation_date)}
          </div>
          <div style={{ marginLeft: '2rem'}}>
            Lasts from {this.formatDate(posting.start_date)} to {this.formatDate(posting.end_date)}
          </div>
          <div style={{ marginLeft: '2rem'}}>
            Located in {posting.city}, {posting.country}. {location}
          </div>
          <div style={{ marginLeft: '2rem'}}>
            {publicState}, {blockState}. Maximum Guests: {posting.max_number_guests}. Price per day: {posting.price_day}
          </div>
          <div>
          <button style={{ marginLeft: '2rem', marginBottom: '1.2rem' }}
              type="button"
              variant="contained"
              color="primary"
              onClick={() => this.setBlockState(posting.id_posting, !posting.blocked)}>
              {blockText} this posting
          </button>
          </div>
        </div>
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
    const token = userToken;
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
        <div>
          <div>
            {this.state.postings_list.map(this.postingDisplay, this)}
          </div>
        </div>
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

PostingsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostingsList)