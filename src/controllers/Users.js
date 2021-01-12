import React, {Component} from 'react';
import "../assets/css/Home.css";
import Paperbase from "../components/Paperbase"
import UserList from "../components/UserList"

export class Users extends Component {
    render() {
        return (        
            //<Paperbase selectedRoute='userlist'><div>Puto</div></Paperbase>   
            <Paperbase selectedRoute='home' header='User List' ><UserList></UserList></Paperbase>
        )
    }
}
