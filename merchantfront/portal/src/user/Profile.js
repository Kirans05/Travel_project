import React, { Component } from 'react';
import {Container, Paper, Box, Avatar, Typography, Divider, Grid, Stack, TextField, Button} from '@mui/material';
import CreditCardInput from 'react-credit-card-input';
import { Link, Redirect, } from 'react-router-dom'

class Profile extends Component {
	constructor(props) {
        super(props);
		this.state = {
			 
		} 
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	 
	handleSubmit() {
		 
	}
	
    render() { 
 
		const { classes } = this.props;
		 	

        return (
			 <Container component="main" maxWidth="lg"> 
			 <Box align="center"> <h1 className="home-title">User Profile</h1> </Box>
          	  <Paper style={{padding: '2em'}}>
				<Typography variant="h6">Details</Typography>
				<Divider style={{marginBottom: '2em'}}/>
				<Stack spacing={2}>	 
					<TextField name="firstName" label="First name" value={this.props.currentUser.firstName} variant="outlined" onChange={this.handleInputChange} disabled/>
					<TextField name="lastName" label="Last name" value={this.props.currentUser.lastName} variant="outlined" onChange={this.handleInputChange} disabled/>
              	    <TextField name="email" label="Email" value={this.props.currentUser.email} variant="outlined" onChange={this.handleInputChange} disabled/>
				</Stack>
			  </Paper>
			</Container>
        );
    }
}
 
export default Profile;