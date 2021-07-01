import React, { Component } from 'react';
import './Hem.css';
import HobbyList from './HobbyList';

class Hem extends Component {
    render() {
        return (<div className="card">
            <h2 className="name">Hemdai</h2>
            <img src="hem_ridhan.jpg" alt="Hem_Ridhan_Pic"></img>
            <h5 style={{ fontSize: '2em', margin: '2px' }}
            alt="Hem">Hobbies:</h5>
            <HobbyList />
        </div>);
    }
}

export default Hem;