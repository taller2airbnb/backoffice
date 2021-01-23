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
import {get, get_profile, put_profile} from "../communication/Request";
import {postingsEndpoint, backofficeToken, postingBlockEndpoint, userToken, apikeysEndpoint} from "../communication/endpoints/EndpointList";


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


class ServerList extends React.Component {    
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        status: null,
        name: '',
        api_keys: [],
        errorMessage: ''
    };
  }

  async componentDidMount() {
    this.reloadApiKeys()
  }

  async reloadApiKeys() {
    const token = backofficeToken;
    const endpoint = apikeysEndpoint;
    const response = await get_profile(endpoint, token);
    this.setState({ status: response.status, loading: false});
    if (response.status == 200){
      let json = await response.json();
      let myList = json.apikeys
      myList.sort((a,b) => (a.id > b.id) ? 1: -1)
      this.setState({ api_keys: myList});
    }
  }

  apiKeysDisplay(api_key){
    let blockText = 'Block';
    let activeIcon = <CheckCircle />
    let blockColor = 'secondary'
    if (!api_key.active){
      blockText = 'Unblock';
      activeIcon = <Cancel />
      blockColor = 'primary'
    }
    return (
      <TableRow key={api_key.name_from}>
        <TableCell align="left" style={{fontWeight: 'bold'}}>{api_key.name_from}</TableCell>
        <TableCell align="center">{api_key.id}</TableCell>
        <TableCell align="center">{api_key.api_key_token}</TableCell>
        <TableCell align="center">{activeIcon}</TableCell>
        <TableCell align="center">
          <Button
              type="button"
              variant="contained"
              color={blockColor}
              onClick={() => this.setActiveState(api_key.id, !api_key.active)}>
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

  async setActiveState(posting_id, value) {
    const token = backofficeToken;
    const body = {"active": value}
    const endpoint = apikeysEndpoint + posting_id + '/active_status';
    let response = await put_profile(endpoint, body, token)
    this.setState({loading: true})
    this.reloadApiKeys()
  }


  render(){

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.api_keys.length > 0){
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">API key token</TableCell>
                        <TableCell align="center">Active?</TableCell>
                        <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.api_keys.map(this.apiKeysDisplay, this)}
                    </TableBody>
                    </Table>
                </TableContainer>
                <div align='center'  style={{marginTop: '2rem' }}>
                    <Button
                    type="button"
                    variant="contained"
                    color='primary'
                    onClick={() => this.setState({loading: true})}>
                        Create server
                    </Button>
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

ServerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServerList)