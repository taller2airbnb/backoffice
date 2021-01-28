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
import {get, put} from "../communication/Request";
import {covidEndpoint} from "../communication/endpoints/EndpointList";


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


function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

class CovidSettings extends React.Component {    
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        status: null,
        allow: false,
        covidParams: {},
        errorMessage: '',
    };
    this.onInputchange = this.onInputchange.bind(this);
  }

  onInputchange(event) {
    this.updateParam([event.target.name], event.target.value)
    this.setState({allow: !this.validateForm()})
  }

  updateParam(param_name, value){
    let newParams = this.state.covidParams
    newParams[param_name] = value
    this.setState({covidParams: newParams})
  }

  validateForm(){
    let check = true
    for (var key in this.state.covidParams) {
        if (isNumeric(this.state.covidParams[key])){
            check = false
        }
      }
    return (check);
  }

  generatePutBody(){
    let body = this.state.covidParams
    for (var key in body) {
        body[key] = Number(body[key])
      }
    return(body)
  }

  async componentDidMount() {
    this.reloadCovidParams()
  }

  async reloadCovidParams() {
      const endpoint = covidEndpoint;
      const response = await get(endpoint);
      this.setState({ status: response.status, loading: false});
      if (response.status == 200){
        let json = await response.json();
        this.setState({ covidParams: json });
      }
  }

  paramsToList(paramDict) {
    let displayNames = {
        fatality_rate: 'Fatality Rate',
        fatality_rate_variation: 'Fatality Rate Variation',
        jump_days: 'Jump Days',
        number_days_window_delta: 'Number Days Window Delta',
        threshold_slope_variation: 'Threshold Slope Variation',
        total_jumps: 'Total Jumps',
    }
    let myList = []
    for (var key in paramDict) {
        myList = myList.concat({name: key, display_name: displayNames[key], value: paramDict[key]})
      }
    return (myList)
  }

  paramDisplay(param){
    return (
      <TableRow>
        <TableCell style={{fontWeight: 'bold'}}>{param.display_name}</TableCell>
        <TableCell align="center">
            <input
            name = {param.name}
            type="text" onChange={ this.onInputchange} 
            value={this.state.covidParams[param.name]}
            />
        </TableCell>
      </TableRow>
    );
  }

  async setCovidParams(){
    const body = this.generatePutBody()
    const endpoint = covidEndpoint
    let response = await put(endpoint, body)
    this.setState({loading: true, allow: false})
    this.reloadCovidParams()
  }

  paramTable(){
      return (
        <TableContainer style={{ width: 600 }} component={Paper}>
            <Table  aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Parameter</TableCell>
                        <TableCell align="center">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {this.paramsToList(this.state.covidParams).map(this.paramDisplay, this)}
                </TableBody>
            </Table>
        </TableContainer>
      )
  }


  submitButton(){
    return(
        <div align='center'  style={{marginTop: '2rem' }}>
            <Button
            disabled={!this.state.allow}
            type="button"
            variant="contained"
            color='primary'
            onClick={() => this.setCovidParams()}>
                Set new values
            </Button>
        </div>
    )
  }

  render(){

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.covidParams != {}){
        return(
            <div align="center">
                {this.paramTable()}
                {this.submitButton()}
            </div>
        )
    }

    return (
      <div>
        <div>Status: {this.state.status}</div>
      </div>
    );
  }
}

CovidSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CovidSettings)