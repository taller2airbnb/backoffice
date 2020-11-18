import React, {Component} from 'react';
import logo from '../assets/img/logo.svg';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"

export class Other extends Component {
    render() {
        return (           
            <Paperbase selectedRoute='other'><div>Coming soon...</div></Paperbase>
        )
    }
}
