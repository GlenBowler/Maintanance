
import axios from 'axios';
import React, { Component } from 'react'
import './ViewItem.css'

export class ViewItems extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            posts:[]
        }
    }
    componentDidMount(){
        axios.get('/api/get-all')
        .then(response=>{
            console.log(response);
            this.setState({posts:response.data})
        })
        .catch(error=>{
            console.log(error);
        })
    }
    //Render table data function
    renderTableData(){
        return this.state.posts.map((post,index)=>{
            const{name,description,location,priority,status,isArchived,submitDate}=post;
            return(
            <tr key={name}>
                <td>{name}</td>
                <td>{description}</td>
                <td>{location}</td>
                <td>{priority}</td>
                <td>{status}</td>
                <td>{isArchived}</td>
                <td>{submitDate}</td>
            </tr>
            )
        })
    }

    render() {
        //const {posts}=this.state;
        return (
            <div>
            <h3>Table data</h3>
            <table id="viewitem">
                <tbody>
                    <tr><th>Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Priority</th>
                        <th>Satus</th>
                        <th>Is Archived?</th>
                        <th>Submit data</th>
                        </tr>
                    {this.renderTableData()}
                </tbody>
            </table>
            </div>
        )
    }
}

export default ViewItems

