
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
 37
 38
 39
 40
 41
 42
 43
 44
 45
 46
 47
 48
 49
 50
 51
 52
 53
 54
 55
 56
 57
 58
 59
 60
 61
 62
 63
 64
 65
 66
 67
 68
 69
 70
 71
 72
 73
 74
 75
 76
 77
 78
 79
 80
 81
 82
 83
 84
 85
 86
 87
 88
 89
 90
 91
 92
 93
 94
 95
 96
 97
 98
 99
100
101
102
103
104
105
106
107
import React, { Component } from 'react'
import './ViewItem.css'
import axios from 'axios'

export class GetByStatus extends Component {
    //Declaring our states
    state={
        status:'',
        posts:[]
    }
    //Getting data
    getPost=()=>{
        axios.get('/api')
        .then((resp)=>{
            const data=resp.data;
            this.setState({posts:data});
            console.log('Data has succesfully been retrieved');
        })
        //if not succesfull give a error msg back
        .catch(()=>{
            alert('Error getting the data succesfully')
        })
    }

    handleChange=({target})=>{
        const stateChange=[];
        stateChange[target.name] = target.value;
        this.setState(stateChange);
    }

    submit=(e)=>{
        e.preventDefault();
        //Saving our current data so that we can post it to database
        const payload={
            status:this.state.status,
        };
        console.log(payload.status);
        //getting access to route where we will save data to server
        axios({
            url:'/api/status/'+payload.status,
            method:'GET',
            data:payload
        })
            //if succesfull give user the heads up that was succesfull
            .then((resp)=>{
                console.log('Update item was succesfull');
                //Setting user input back to none so that we dont accidently save the user input again by calling funtion
                this.setState({posts:resp.data});
                this.resetUserInput();
            })
            //if was not succesfull let user know
            .catch(()=>{
                console.log('Update one item was not succesfull');
            });;
    };
    //funciton to reset all the user input back to none
    resetUserInput=()=>{
        this.setState({
            status:'',
        });
    };

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
        return (
            <div>
                <h3>Getting data by status</h3>
                <form onSubmit={this.submit}>
                <input type="text" name="status" placeholder="status" value={this.state.status} onChange={this.handleChange}/>
                <button>Submit</button>
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
                </form>
            </div>
        )
    }
}

export default GetByStatus
