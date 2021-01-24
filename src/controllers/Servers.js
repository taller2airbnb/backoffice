import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import ServerList from "../components/Servers"

export class Servers extends Component {
    render() {
        return (
            <Paperbase selectedRoute='servers' header='Servers' ><ServerList></ServerList></Paperbase>
        )
    }
}
