import React, { Component } from 'react';
import { Container, Paper, Box, Avatar, Typography, Divider, Grid, Stack, TextField, Button } from '@mui/material';
import Alert from '@mui/lab/Alert';
import { addTour } from '../util/APIUtils';
import CreditCardInput from 'react-credit-card-input';
import { Link, Redirect, } from 'react-router-dom'

class AddTour extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:null,
			description:null,
			imageUrl:null,
			price:null,
			currency:null,
			availableQty:null,
			city:null,
			failed: false,
			success: false,
			message:null,


}
		// this.handleSubmit = this.handleSubmit.bind(this);
		 this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.setError = this.setError.bind(this);
		this.setSuccess = this.setSuccess.bind(this);
		this.resetState = this.resetState.bind(this);
	}


	handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }
	setError(messageText){
		this.setState({failed: true,success: false, message: messageText});
	}
	setSuccess(messageText){
		this.setState({failed: false,success: true, message: messageText});
	}
	resetState() {
		this.setState({name: null, description: null, imageUrl: null, price: null, city: null});
	}
	handleSubmit(event) {

		if(this.state.name == null || this.state.name === ''){
			this.setError('Please enter name');
			return;
		}  
		if(this.state.description == null || this.state.description === ''){
			this.setError('Please enter description');
			return;
		}  
		if(this.state.imageUrl == null || this.state.imageUrl === ''){
			this.setError('Please enter imageUrl');
			return;
		} 
		if(this.state.price == null || this.state.price === ''){
			this.setError('Please enter price');
			return;
		}
		if(this.state.currency == null || this.state.currency === ''){
			this.setError('Please enter currency');
			return;
		}
		if(this.state.availableQty == null || this.state.availableQty === ''){
			this.setError('Please enter availableQty');
			return;
		}
		if(this.state.city == null || this.state.city === ''){
			this.setError('Please enter city');
			return;
		}
		event.preventDefault();  
        const tour = Object.assign({}, this.state);

        addTour(tour)
        .then(response => {
			if(response.success==true) {		
            	this.setSuccess("You're successfully Added Tour");
            	this.resetState();
			} else {
				this.setError("Error saving tour " + response.message);
			}
			
        }).catch(error => {
            this.setError((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
		
	

	}

	render() {

		const { classes } = this.props;


		return (
			 
			<Container component="main" maxWidth="lg" >
				<Box align="center"> <h1 className="home-title">Add tour</h1> </Box>
				<Paper style={{ padding: '2em' }}>
					<Typography variant="h6">Tour Details</Typography>
					<Divider />
					{this.state.failed &&  <Alert severity="error" elevation="0">{this.state.message}</Alert>}
				     {this.state.success &&  <Alert severity="success" elevation="0">{this.state.message}</Alert>}
					<br></br>
					<Container size="md" style={{ marginLeft:"20%" }}>
						
					<TextField name="name" label="Tour name " value={this.state.name} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange} required /><br></br><br></br>
					<TextField name="description" label="Tour description" value={this.state.description} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange} required /><br></br><br></br>
					<TextField name="imageUrl" label="Image URL" value={this.state.imageUrl} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange} required /><br></br><br></br>
					<TextField name="price" label="Tour price" value={this.state.price} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange}  required /><br></br><br></br>
					<TextField name="currency" label="Currency" value={this.state.currency} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange}  required /><br></br><br></br>
					<TextField name="availableQty" label="Available quantity " value={this.state.availableQty} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange}  required /><br></br><br></br>
					<TextField name="city" label="City" value={this.state.city} style={{ width: '50%' }} variant="outlined" onChange={this.handleInputChange}  required /><br></br><br></br>
					<Button variant="contained" onClick={this.handleSubmit} style={{ marginLeft:'15%' , width:"20%" }}>Submit</Button>
					</Container>

				</Paper>
			</Container>
		);
	}
}

export default AddTour;