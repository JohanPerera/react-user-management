import './Form.css';
import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';


export class Form extends Component {
    //   static updateMode = true;

    constructor(props) {
        super(props);

        this.state = {
            _id: "",
            username: "",
            address: "",
            phonenumber: "",
            sex: "female",
            updateMode: true,
            users: []
        };





    }

    componentWillMount() {
        axios.get('http://localhost:3001/users').then((res) => {
            if (res && res.data) {
                const users = res.data;
                this.setState({
                    users
                })
            }
        }
        ).catch((err) => {
            console.log(err);
        }
        )
    }



    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value,
        });
    };

    handlePhonenumberChange = (event) => {
        this.setState({
            phonenumber: event.target.value,
        });
    };

    handleSexChange = (event) => {
        this.setState({
            sex: event.target.value,
        });
    };

    onSubmit = (event) => {
        const { username, address, phonenumber, sex } = this.state;
        alert(`${username}, ${address}, ${phonenumber}, ${sex}`);
        event.preventDefault();

        const requestData = { username, address, phonenumber, sex };


        axios
            .post("http://localhost:3001/users", requestData)
            .then((res) => {
                if (res) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };



    handleUpdate = (event) => {
        event.preventDefault();

        const { _id, username, address, phonenumber, sex } = this.state;

        const requestData = { _id, username, address, phonenumber, sex };

        axios
            .put("http://localhost:3001/users", requestData)
            .then((res) => {
                if (res) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleModeChange = (event, mode) => {
        if (mode[0] === "update") {
            this.setState({
                updateMode: true,
            });
        } else if (mode[0] === "add") {
            this.setState({
                updateMode: false,
            });
        }

    };

    handleUserChange = (event) => {
        let userObj = JSON.parse(event.target.value);

        //const { username, address, phonenumber, sex } = this.state;
        this.setState({
            _id: userObj._id,
            username: userObj.username,
            phonenumber: userObj.phonenumber,
            address: userObj.address,
            sex: userObj.sex
        });

    }

    handleUserDelete = (event) => {
        event.preventDefault();

        axios.delete("http://localhost:3001/users/" + this.state._id).then((res) => {
            if (res) {
                console.log(res);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        const { username, address, phonenumber, sex, updateMode, users } = this.state;
        return (
            <FormGroup className="wrapper">

                <Grid container spacing={2} direction="column" alignItems="center">
                    <Grid item>
                        <ToggleButtonGroup size="small" onChange={this.handleModeChange}>
                            <ToggleButton value="add">Add</ToggleButton>
                            <ToggleButton value="update">Update</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
                {updateMode ?
                    <FormControl >
                        <div className="field">
                        <FormLabel className="field_label">Select User : </FormLabel>
                        <Select className="select_field"  onChange={this.handleUserChange}>
                            {users.map(user => (
                                <option key={user._id} value={JSON.stringify(user)}>{user.username}</option>
                            ))}

                        </Select >
                        </div>
                    </FormControl>
                    :
                    <FormControl >
                        <div className="field">
                        <FormLabel className="field_label">User Name : </FormLabel>
                        <TextField
                            type="text"
                            value={username}
                            onChange={this.handleUsernameChange}
                        ></TextField>
                        </div>
                    </FormControl>
                }


                <FormControl>
                    <div className="field">
                        <FormLabel className="field_label">Phone Number : </FormLabel>
                        <TextField
                            placeholder="Phone Number"
                            type="text"
                            value={phonenumber}
                            onChange={this.handlePhonenumberChange}
                        ></TextField>
                    </div>
                </FormControl>
                <FormControl>
                    <div className="field">
                    <FormLabel className="field_label">Address : </FormLabel>
                    <TextField
                        placeholder="Type your Address here"
                        value={address}
                        onChange={this.handleAddressChange}
                    ></TextField >
                    </div>
                </FormControl>
                <FormControl >
                    <div className="field">
                    <FormLabel className="field_label">Sex : </FormLabel>
                    <Select className="select_field" value={sex} onChange={this.handleSexChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select >
                    </div>
                </FormControl>

                {updateMode ? (
                    <div>
                        <Button className="main_buttons" variant="contained" color="secondary" onClick={this.handleUserDelete}>Delete</Button>
                        <Button className="main_buttons" variant="contained" color="primary" onClick={this.handleUpdate}>Update</Button>
                    </div>
                ) : (
                    <div>
                        <Button className="main_buttons" variant="contained" color="primary" onClick={this.onSubmit}>Add</Button>
                    </div>

                )}
            </FormGroup>
        );
    }
}

export default Form;



