import React, { Component } from "react";

export class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            address: '',
            phonenumber:'',
            sex:'female'
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleAddressChange = (event) => {
        this.setState({
            address:event.target.value
        })
    }

    handlePhonenumberChange = (event) => {
        this.setState({
            phonenumber:event.target.value
        })
    }
    
    handleSexChange = (event) => {
        this.setState({
            sex:event.target.value
        })
    }

    handleSubmit = (event) =>{
        alert(`${this.state.username}, ${this.state.address}, ${this.state.phonenumber}, ${this.state.sex}`)
        event.preventDefault()
    }
    render() {
        const {username,address,phonenumber,sex} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>User Name : </label>
                    <input type='text' value={username} onChange={this.handleUsernameChange}></input>
                </div>
                <div>
                    <label>Phone Number : </label>
                    <input type='text' value = {phonenumber} onChange={this.handlePhonenumberChange}></input>
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
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

export default Form;