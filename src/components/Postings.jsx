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
import {postingsEndpoint, userListEndpoint, userToken} from "../communication/endpoints/EndpointList";


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
        formData: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            national_id_type: '',
            national_id: '',
            alias: '',
            profile: 0
        },
        postings_list: [],
        user_list: [],
        errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
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

  handleInputChange(event) {
    const input = event.target;
    let formData = this.state.formData;
    formData[input.name] = input.value;
    this.setState({formData: formData});
}

  handleApiResponse(response) {
      if (response.hasError()) {
          this.setState({errorMessage: response.errorMessages()});
      } else {
          alert("User Created Successfully");        
      }
  }

  handleSubmit() {
      app.apiClient().register(this.state.formData, this.handleApiResponse);
  }

  listingDisplay(listing){
    return (
        <div>
          <div style={{fontWeight: 'bold'}}>{listing.name}</div>
          <div style={{ marginLeft: '2rem', marginBottom: '0.7rem' }} >Posted by {this.getUserName(listing.id_user)}</div>
        </div>
    );
  }

  getUserName(user_id){
    let users = this.state.user_list.filter( function (user) { return user.id == user_id})
    if (users.length > 0) {
      let user = users.[0]
      return user.first_name + ' ' + user.last_name
    }
    else{
      return 'unknown'
    }
  }

  render(){

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.postings_list.length > 0){
      return (
        <div>
          <div>
            {this.state.postings_list.map(this.listingDisplay, this)}
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