import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import CovidSettings from "../components/Covid"

export class Covid extends Component {
    render() {
        return (
            <Paperbase selectedRoute='covid' header='Covid Settings' ><CovidSettings></CovidSettings></Paperbase>
        )
    }
}
