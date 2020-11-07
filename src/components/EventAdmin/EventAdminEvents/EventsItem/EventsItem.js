import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';
import { HashRouter, Link } from 'react-router-dom';


import EventsDelete from "../EventsDelete/EventsDelete";
import EventsEdit from "../EventsEdit/EventsEdit";


//materialUI and styling
import Button from '@material-ui/core/Button';
import "./EventsItem.css"


class EventsItem extends Component {
            componentDidMount=()=>{
                this.props.dispatch({
                    type: 'FETCH_EVENTS' //grabs only uncompleted events
                })
            };//end componentDidMount


    render() {
        return (
            <HashRouter>
                    <tr> 
                        <td>{this.props.item.location}</td>
                        <td>{this.props.item.timestamp}</td>
                        <td><Link to="/request"><Button>Material Request Queue</Button></Link></td>
                        <td><EventsEdit/></td>
                        <td><EventsDelete/></td>
                    </tr>
            </HashRouter>
        );
    }
}

export default connect(mapStoreToProps)(EventsItem);