import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import AddPosting from "../components/NewPosting"

export class NewPosting extends Component {
    render() {
        return (
            <Paperbase selectedRoute='newposting' header='Create Posting' ><AddPosting></AddPosting></Paperbase>
        )
    }
}
