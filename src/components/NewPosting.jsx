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
import {get, post} from "../communication/Request";
import {newPostingEndpoint, userToken} from "../communication/endpoints/EndpointList";


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
    let today = new Date();
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
                  type="date"
                  autoComplete="start_date"
                  name="start_date"
                  variant="outlined"
                  required
                  fullWidth
                  id="start_date"
                  label="Start Date"
                  locale={"en"}
                  formatChosenDate={date => {return date.format('YYYY-MM-DD');}}
                  timeZoneOffsetInMinutes={undefined}
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="date"
                  variant="outlined"
                  required
                  fullWidth
                  id="end_date"
                  label="End Date"
                  name="end_date"
                  autoComplete="end_date"
                  locale={"en"}
                  formatChosenDate={date => {return date.format('YYYY-MM-DD');}}
                  timeZoneOffsetInMinutes={undefined}
                  onChange={(e) => changeHandler(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
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
                  type="number"
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
                  type="number"
                  autoComplete="latitude"
                  defaultValue = "-58.5429559"
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
                  type="number"
                  variant="outlined"
                  defaultValue = "-34.5140423"
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
              start_date: this.todaysDate(),
              end_date: this.todaysDate(),
              price_day: 0,
              max_number_guests: 0,
              content: '',
              features: '',
              state: 'activa',
              country: '',
              city: '',
              latitude: "-58.5429559",
              longitude: "-34.5140423",
              public: true,
          },
          errorMessage: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.handleApiResponse = this.handleApiResponse.bind(this);
    }
  
    todaysDate(){
        let today = new Date();
        var day = today.getDate();
        if (day<10){
            day = '0'+day
        }
        var month = today.getMonth() + 1;
        if (month<10){
            month = '0'+month
        }
        return today.getFullYear()+'-'+month+'-'+day;
    }

    handleInputChange(event) {
      const input = event.target;
      let formData = this.state.formData;
      formData[input.name] = input.value;
      this.setState({formData: formData});
  }
  
  validForm(){
    var fields = ['latitude', 'longitude', 'price_day'];
    for (var i in fields){
        if((this.state.formData[fields[i]].toString() == '') || (isNaN(Number(this.state.formData[fields[i]])))){
            this.setState({errorMessage: 'Field ' + fields[i] + ' not numeric or empty.'})
            return false;
        }
    }
    if((this.state.formData.max_number_guests.toString() == '') || (isNaN(Number(Math.floor(this.state.formData.max_number_guests))))){
        this.setState({errorMessage: 'Field Max guests not integer or empty.'})
        return false;
    }
    return true;
  }

  async submit(form) {
    //const token = localStorage.getItem('token');
    const token = userToken;
    const body = form
    const endpoint = newPostingEndpoint;
    let response = await post(endpoint, body, token)
    if(response.status == 200){
        this.setState({errorMessage: 'Posting created successfully.'})
    }else{
        let json = await response.json();
        this.setState({errorMessage: json.message})
    }
  }

  cleanUpForm(){
      let form = this.state.formData;
      form.price_day = form.price_day.toString()
      form.max_number_guests = Number(form.max_number_guests)
      form.latitude = Number(form.latitude)
      form.longitude = Number(form.longitude)
  }


  handleSubmit() {
      if (this.validForm()){
        var newForm = this.cleanUpForm()
        this.submit(newForm)
      }
      //app.apiClient().register(this.state.formData, this.handleApiResponse);
  }
  
    render(){     
        return (
            <Container>
                <SignUp handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} errorMessage={this.state.errorMessage}></SignUp>
                <div>
                    <text>Price: {Number(this.state.formData.price_day.toString())}</text>
                </div>
                <div>
                    <text>Latitude: {this.state.formData.latitude.toString()}</text>
                </div>
            </Container>
        )
    }    
  }
  
  AddPosting.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AddPosting);