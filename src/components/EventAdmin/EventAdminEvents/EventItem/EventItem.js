import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { HashRouter, Link } from 'react-router-dom';


import EventComplete from "../EventComplete/EventComplete";
import EventEdit from "../EventEdit/EventEdit";


//materialUI and styling
import Button from '@material-ui/core/Button';
import "./EventItem.css"



class EventItem extends Component {

    render() {
            let t = new Date (this.props.item.timestamp)
            let time = t.toLocaleTimeString('en-US')
        return (
            <HashRouter>
                    <tr> 
                        <td>{this.props.item.location}</td>
                        <td>{this.props.item.timestamp.split('T')[0]}</td>
                        <td>{time}</td>
                        <td><Link to="/request/:id"><Button>Queue</Button></Link></td>
                        <td><EventEdit
                                matchID={this.props.item.id}
                                item={this.props.item}
                        /></td>
                        <td><EventComplete
                                item={this.props.item}
                        /></td>
                    </tr>
            </HashRouter>
        );
    }
}

export default connect(mapStoreToProps)(EventItem);