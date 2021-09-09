import React, { Component } from "react";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export class Form extends Component {

    static updateMode = true;

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            address: '',
            phonenumber: '',
            sex: 'female'
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handlePhonenumberChange = (event) => {
        this.setState({
            phonenumber: event.target.value
        })
    }

    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value
        })
    }

    onSubmit = (event) => {
        alert(`${this.state.username}, ${this.state.address}, ${this.state.phonenumber}, ${this.state.sex}`)
        event.preventDefault()

        axios.post('http://localhost:3001/users', this.state).then((res) => {
            if (res) {
                console.log(res);
            }
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }

    handleDelete = (event) => {
        event.preventDefault()
        console.log("delete");
    }
    handleUpdate = (event) => {
        event.preventDefault()
        axios.put('http://localhost:3001/users', this.state).then((res) => {
            if (res) {
                console.log(res);
            }
        }
        ).catch((err) => {
            console.log(err);
        })

    }

    handleModeChange = (event, mode) => {
        if (mode[0] === "update") {
            this.updateMode = true;
            console.log("update mode");
        } else if (mode[0] === "add") {
            this.updateMode = false;
            console.log("Add mode");
        }
        console.log(this.updateMode);
    }


    render() {


        const { username, address, phonenumber, sex } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item>
                        <ToggleButtonGroup size="small"  onChange={this.handleModeChange}>
                            <ToggleButton value="add">
                                Add
                            </ToggleButton>
                            <ToggleButton value="update">
                                Update
                            </ToggleButton>

                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
                <div>
                    <label>User Name : </label>
                    <input type='text' value={username} onChange={this.handleUsernameChange}></input>
                </div>
                <div>
                    <label>Phone Number : </label>
                    <input type='text' value={phonenumber} onChange={this.handlePhonenumberChange}></input>
                </div>
                <div>
                    <label>Address : </label>
                    <textarea value={address} onChange={this.handleAddressChange}></textarea>
                </div>
                <div>
                    <label>Sex : </label>
                    <select value={sex} onChange={this.handleSexChange}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>
                <button onClick={this.handleDelete} >Delete</button>
                {this.updateMode ? <button onClick={this.handleUpdate}>Update</button> : <button onClick={this.onSubmit}>Add</button>}

            </form>
        )
    }
}

export default Form;