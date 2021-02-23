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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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
            Posting Creation Form
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Posting Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="start_date"
                  name="start_date"
                  variant="outlined"
                  required
                  fullWidth
                  id="start_date"
                  label="Start Date"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="end_date"
                  label="End Date"
                  name="end_date"
                  autoComplete="end_date"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="price_day"
                  label="Price per day"
                  name="price_day"
                  autoComplete="price_day"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="max_number_guests"
                  label="Maximum Guests"
                  name="max_number_guests"
                  autoComplete="max_number_guests"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="content"
                  label="Content"
                  name="content"
                  autoComplete="content"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="features"
                  label="Features"
                  name="features"
                  autoComplete="features"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="country"
                  name="country"
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="latitude"
                  name="latitude"
                  variant="outlined"
                  required
                  fullWidth
                  id="latitude"
                  label="Latitude"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="longitude"
                  label="Longitude"
                  name="longitude"
                  autoComplete="longitude"
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
            </Grid>
            {props.errorMessage && <Typography component="h1" variant="h5" style={{color: 'red'}}>
              {props.errorMessage}
            </Typography>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              Create User
            </Button>
          </form>
        </div>      
      </Container>
    );
  }
  
  class AddPosting extends React.Component {    
    constructor(props) {
      super(props);
  
      this.state = {
          formData: {
              name: '',
              start_date: '',
              end_date: '',
              price_day: '',
              max_number_guests: '',
              content: '',
              features: '',
              state: '',
              country: '',
              latitude: '',
              longitude: '',
              city: '',
              public: true,
          },
          errorMessage: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleApiResponse = this.handleApiResponse.bind(this);
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
          alert("Posting Created Successfully");        
      }
  }
  
  handleSubmit() {
      app.apiClient().register(this.state.formData, this.handleApiResponse);
  }
  
    render(){     
        return (
            <Container>
                <SignUp handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} errorMessage={this.state.errorMessage}></SignUp>
                <text>TEST: {this.state.formData.content}</text>
            </Container>
        )
    }    
  }
  
  AddPosting.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddPosting);