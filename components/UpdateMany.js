import React, { Component } from 'react'
import axios from 'axios';

export class UpdateMany extends Component {
    //Function to update all thoose whoose status is Submitted to in progress
    submit=(e)=>{
        e.preventDefault();
        //Getting access to the endpoint /update-many
        axios({
            url:'/api/update-many',
            method:'POST'
        })
        //if successfull let us know
        .then(()=>{
            console.log("Update wss succesfull");
        })
        //if not succesfull let user know was not succesfull
        .catch(()=>{
            console.log("Update was not succesfull");
        })
    };
    render() {
        return (
            <div>  
                {/*Calling the function*/}
                <form onSubmit={this.submit}>
                <h3>If you click on this button will update all status that was Submitted to in progress</h3>
                <button>Update Many</button>
                </form>
            </div>
        )
    }
}

export default UpdateMany
