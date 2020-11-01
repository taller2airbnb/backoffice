import React, {Component} from 'react';
import logo from '../assets/img/logo.svg';
import "../assets/css/Home.css";

export class Home extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Este es el home papu
                    </p>
                </header>
            </div>
        )
    }
}
