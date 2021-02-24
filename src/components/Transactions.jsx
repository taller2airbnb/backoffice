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
import {transactionsEndpoint, userToken} from "../communication/endpoints/EndpointList"


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


class TransactionList extends React.Component {    
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        status: null,
        transactions: [],
        errorMessage: ''
    };
  }

  async componentDidMount() {
    this.loadTransactions();
  }


  async loadTransactions() {
    const token = userToken;
    const endpoint = transactionsEndpoint;
    const response = await get(endpoint, token);
    this.setState({ status: response.status, loading: false});
    if (response.status == 200){
      let json = await response.json();
      json.sort((a,b) => (a.creation_date > b.creation_date) ? 1: -1)
      this.setState({ transactions: json});
    }
  }

  listATransaction(user){
    return (
      <TableRow key={user.name}>
        <TableCell align="left" style={{fontWeight: 'bold'}}>{user.name_posting}</TableCell>
        <TableCell align="left">{this.formatDateAndTime(user.creation_date)}</TableCell>
      </TableRow>
    );
  }

  formatDateAndTime(date_string){
    let date = this.splitDate(date_string)
    return date.day + '/' + date.month + '/' + date.year + ' - ' + date.time
  }

  splitDate(date_string){
    let date = {}
    date.year = date_string.substring(0,4)
    date.month = date_string.substring(5,7)
    date.day = date_string.substring(8,10)
    date.time = date_string.substring(11,19)
    return date
  }

  render(){

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.transactions.length > 0){
      return (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Posting Name</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.transactions.map(this.listATransaction, this)}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <div>
        <div>Status: {this.state.status}</div>
      </div>
    );
  }
}

TransactionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionList);