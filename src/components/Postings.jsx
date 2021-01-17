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
//import {postingsEndpoint, userToken} from "../communication/endpoints/EndpointList";
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
        user_list: [],
        errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
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

  initializeForm(){
    this.setState({ test: 'asdas'});
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

  listAUser(user){
    let blockText = 'Block';
    if (user.blocked){
      blockText = 'Unblock';
    }
    else {
      blockText = 'Block';
    }
    return (
        <div>
          <div style={{fontWeight: 'bold'}}>{user.first_name} {user.last_name}</div>
          <div>
            Alias: {user.alias}, 
            Mail: {user.email}, 
            ID: {user.national_id_type} {user.national_id}, 
            Key: {user.id},  
            Blcked: {user.blocked.toString()}
          </div>
  
          <button 
              type="button"
              variant="contained"
              color="primary"
              onClick={() => this.setBlockStatus(user.id, !user.blocked)}>
              {blockText} {user.first_name}
          </button>
        </div>
    );
  }

  async setBlockStatus(user_id, new_status) {
    //edit = async() => {
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
        <div>
          <div>Status: {this.state.status}</div>
          <div>{this.state.name}</div>
          <div>{localStorage.getItem("token")}</div>
          <div>
            {this.state.user_list.map(this.listAUser, this)}
          </div>
          <div>{userListEndpoint}</div>
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