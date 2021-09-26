import React from "react";
import axios from 'axios';
import './Additem.css';

class AddItem extends React.Component{
    //Declaring our states
    state={
        name:'',
        description:'',
        location: '',
        priority: '',
        posts:[],
    }

    //Get post app if we did mount
    componentDidMount=()=>{
        this.getPost();
    };
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
            name:this.state.name,
            description:this.state.description,
            location:this.state.location,
            priority: this.state.priority,
        };
        //getting access to route where we will save data to server
        axios({
            url:'/api/save',
            method:'POST',
            data:payload
        })
            //if succesfull give user the heads up that was succesfull
            .then(()=>{
                console.log('Data has succesfully sent to your server');
                //Setting user input back to none so that we dont accidently save the user input again by calling funtion
                this.resetUserInput();
                //getting the posts
                this.getPost();
            })
            //if was not succesfull let user know
            .catch(()=>{
                console.log('Was not succesfully sent to your server');
            });;
    };
    //funciton to reset all the user input back to none
    resetUserInput=()=>{
        this.setState({
            name:'',
            description:'',
            location: '',
            priority: '',
        });
    };

    render(){
        console.log('State', this.state);

        return(
            <div>
                <h2>Welcome to my maintanance app!!!</h2>
                <form onSubmit={this.submit}>
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
                    <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.handleChange}/>
                    <input type="text" name="location" placeholder="location" value={this.state.location} onChange={this.handleChange}/>
                    <input type="text" name="priority" placeholder="priority" value={this.state.priority} onChange={this.handleChange}/>

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
export default AddItem;