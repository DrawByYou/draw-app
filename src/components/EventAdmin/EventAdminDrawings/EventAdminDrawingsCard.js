import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { ImageListItem } from '@material-ui/core';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class EventAdminDrawingsCard extends Component {
    state = {
        isClicked: true
    }
    //when image is clicked, state is updated to its current opposite
    clickText = () => {
        console.log("showing text");
        this.setState({
            isClicked: !this.state.isClicked
        });
    }
    infoClick = () => {

        Swal.fire({
            title: `drawing by ${this.props.drawing.name}`,
            text: this.props.drawing.description,
            imageUrl: this.props.drawing.image_url,
            imageAlt: 'drawing',
        });
    }
    onApprove = () => {
        console.log('approve image with id of ', this.props.drawing.id);
        this.props.dispatch({
            type: 'APPROVE_DRAWING',
            payload: this.props.drawing.id
        });
    }
    onDisapprove = () => {
        console.log('disapprove image with id of ', this.props.drawing.id);
        this.props.dispatch({
            type: 'DISAPPROVE_DRAWING',
            payload: this.props.drawing.id
        });
    }
    onDelete = () => {
        console.log('delete image with id of ', this.props.drawing.id);

        Swal.fire({
            title: 'are you sure you want to delete this drawing?',
            text: "you won't be able to undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9dac68',
            cancelButtonColor: '#e26d5c',
            confirmButtonText: 'yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.dispatch({
                    type: 'DELETE_DRAWING',
                    payload: this.props.drawing.id
                });
                Swal.fire('buh-bye!', '', 'success');

            }
        });


    }

    render() {
        return (
            <div >

                <ImageListItem className="pendingItem" key={this.props.drawing.id}>
                    <img src={this.props.drawing.image_url} alt='drawing' onClick={this.infoClick} />
                    <div className="actionDiv">
                        {this.props.drawing.approved === null ?
                            <div>
                                <Button size="medium" color="primary" onClick={this.onDisapprove}>disapprove</Button>
                                <Button size="medium" color="primary" onClick={this.onApprove}>approve</Button>
                            </div> :
                            (this.props.drawing.approved ?
                                <div><Button size="medium" color="primary" onClick={this.onDisapprove}>disapprove</Button>
                                    <a href={this.props.drawing.image_url} download> download </a></div> :
                                <Button size="medium" color="primary" onClick={this.onApprove}>approve</Button>)
                        }

                        <Button size="medium" color="primary" onClick={this.onDelete}>delete</Button>
                    </div>


                </ImageListItem>

            </div>

        );
    }
}

export default connect(mapStoreToProps)(EventAdminDrawingsCard);