import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../../redux/mapStoreToProps';

//material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class EventDeleteConfirm extends Component {
            state = {
                        open: false
            }

            confirmDeleteEvent=()=>{
                        this.props.dispatch({
                                type: 'DELETE_EVENT',
                                url: '/api/event',
                                payload: this.props.item
                        });
                        this.handleClose();

            };//end confirmCreate
           
            

            handleClickOpen = () => {
                        this.setState({
                              open: true,
                        });
                  };

            handleClose = () => {
                        this.setState({
                              open: false
                        });
                  };

      render(){
          console.log('EVENT DELETE', this.props.item)
            return (
                  <div>
                  <Button variant="outlined" onClick={this.handleClickOpen}>Delete</Button>
                        <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle>Delete Event</DialogTitle>
                            <DialogContent>
                                Please Confirm Event Deletion
                                <ul>
                                    <li>Location: {this.props.item.location}</li>
                                    <li>Date: {this.props.date}</li>
                                    <li>Time: {this.props.time}</li>
                                </ul>
                            </DialogContent>
                  <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.confirmDeleteEvent} color="primary">Create</Button>
                  </DialogActions>
            </Dialog>
      </div>
      );
      }
}

export default connect(mapStoreToProps)(EventDeleteConfirm);