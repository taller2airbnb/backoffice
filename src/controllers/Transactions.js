import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import TransactionList from "../components/Transactions"

export class Transactions extends Component {
    render() {
        return (
            <Paperbase selectedRoute='transactions' header='Transaction List' ><TransactionList></TransactionList></Paperbase>
        )
    }
}