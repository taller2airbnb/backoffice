import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {app} from "../app/app";
import {Home} from "../controllers/Home";
import {Other} from "../controllers/Other"
import {Profile} from "../controllers/Profile";
import {Transactions} from "../controllers/Transactions";
import {Login} from "../controllers/Login";
import {Users} from "../controllers/Users";
import HealthCheck from "../controllers/HealthCheck";
import {PrivateRoute} from "./PrivateRoute";
import {Postings} from "../controllers/Postings";
import {Servers} from "../controllers/Servers";
import {Covid} from "../controllers/Covid";

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={app.routes().login} render={props => localStorage.getItem("token") ?
                    <Redirect to={{pathname: app.routes().home}}/> :
                    <Login {...props}/>
                }/>
                <Route exact path={app.routes().healthcheck} component={HealthCheck}/>
                <PrivateRoute exact path={app.routes().home} component={Home}/>
                <PrivateRoute exact path={app.routes().profile} component={Profile}/>
                <PrivateRoute exact path={app.routes().transactions} component={Transactions}/>
                <PrivateRoute exact path={app.routes().other} component={Other}/>
                <PrivateRoute exact path={app.routes().userlist} component={Users}/>
                <PrivateRoute exact path={app.routes().postings} component={Postings}/>
                <PrivateRoute exact path={app.routes().servers} component={Servers}/>
                <PrivateRoute exact path={app.routes().covid} component={Covid}/>
            </Router>
        )
    }


}

export default Routes;