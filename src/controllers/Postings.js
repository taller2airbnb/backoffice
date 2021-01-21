import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import PostingsList from "../components/Postings"

export class Postings extends Component {
    render() {
        return (
            <Paperbase selectedRoute='posting' header='Postings' ><PostingsList></PostingsList></Paperbase>
        )
    }
}
