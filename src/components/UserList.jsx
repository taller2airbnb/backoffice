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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }  
}));

function SignUp(props) {
  const classes = useStyles();
  const submitHandler = () => {
    props.handleSubmit();
  }

  const changeHandler = (e) => {
    props.handleInputChange(e);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>        
        <Typography component="h1" variant="h5">
          List of users
        </Typography>
        <div>User whapenistever</div>
      </div>      
    </Container>
  );
}

function getRequestOptions(method, headers, body, bearerToken){
  let requestOptions = {
      method: method,
      headers: headers        
    };

    if(bearerToken){
      requestOptions.headers = { ...headers, 'Authorization': /* 'Bearer ' + */ bearerToken}
    }
    if(body){
        requestOptions = {...requestOptions, body: JSON.stringify(body)}
    }

    return requestOptions;
}

async function get(endpoint, bearerToken){
  let headers = { 'Content-Type': 'application/json' }
  const requestOptions = getRequestOptions('GET', headers, '', bearerToken);    

  let response = await fetch(endpoint, requestOptions);
  return response;
}




class UserList extends React.Component {    
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
        errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  async componentDidMount() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1ZW5vc2FpcmVzQGVsY29uZG9yLm1hcmRlbHBsYXRhIiwicHJvZmlsZSI6MCwiaWQiOjEsImlhdCI6MTYxMDU3NTEwOSwiZXhwIjoxNjEwNjYxNTA5fQ.zDqMV7VJ-A-bUytyvPzg-QtDLwbwQAncPqy1bmtbEas';
    const url = "https://taller2airbnb-businesscore.herokuapp.com/user";
    const response = await get(url, token);
    //this.setState({ user: 'jorge', loading: false});
    this.setState({ status: response.status, loading: false});
    if (response.status == 200){
      let json = await response.json();
      const user_list = json.message.users     
      this.setState({ name: user_list[0].first_name});
    }
  }

  initializeForm(){
    this.setState({formData:{
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      national_id_type: '',
      national_id: '',
      alias: '',
      profile: 0
  } })
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

  render(){
    if (this.state.loading) {
      return <div>loading...</div>;
    }
//
//    if (!this.state.user) {
//      return <div>didn't get a person</div>;
//    }

    return (
      <div>
        <div>Status: {this.state.status}</div>
        <div>{this.state.name}</div>
      </div>
    );
  }




//  render(){     
//      return <SignUp handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} errorMessage={this.state.errorMessage}></SignUp>
//  }    
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);