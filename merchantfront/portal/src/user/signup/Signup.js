import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom';
import {ACCESS_TOKEN, APP_NAME } from '../../constants/Constants';
import { signup } from '../../util/APIUtils';
import { withStyles } from '@mui/styles'; 
 import Alert from '@mui/lab/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TypoGraphy from '@mui/material/Typography';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const useStyles = theme => ({
   avatar: {
        
    },
	paper: {
        marginTop: '8em',
		padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
	form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '1em',
        marginBottom: '1em',
    },
 	
});

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }
		const { classes } = this.props;
        return (
			<Container component="main" maxWidth="xs">
          		<Paper elevation={3} className={classes.paper}>
				<div align="center">                
                    <TypoGraphy variant="h6">Signup with {APP_NAME}</TypoGraphy>
				</div>
				 
                <SignupForm {...this.props} />
                <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>

                </Paper>
           
			</Container>
        );
    }
}
 

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
			lastName: null,
            email: null,
            password: null,
			confirm: null,
			failed: false,
			message: null,
			success: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.setError = this.setError.bind(this);
		this.setSuccess = this.setSuccess.bind(this);
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

    handleSubmit(event) {
        
		if(this.state.firstName == null || this.state.firstName === ''){
			this.setError('Please enter first name');
			return;
		}  
		if(this.state.lastName == null || this.state.lastName === ''){
			this.setError('Please enter last name');
			return;
		}  
		if(this.state.email == null || this.state.email === ''){
			this.setError('Please enter email');
			return;
		} 
		if(this.state.password == null || this.state.password === ''){
			this.setError('Please enter password');
			return;
		}
		if(this.state.confirm == null || this.state.confirm === ''){
			this.setError('Please confirm password');
			return;
		}
		
		if(this.state.confirm !== this.state.password){
			this.setError('Password and confirmation should match');
			return;
		}
		event.preventDefault();  
        const signUpRequest = Object.assign({}, this.state);
		alert(JSON.stringify(signUpRequest))
        signup(signUpRequest)
        .then(response => {
            this.setSuccess("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            this.setError((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
		const { classes } = this.props;
        return (
				<>
				
        		<Stack spacing={2} className={classes.form}>				
					{this.state.failed &&  <Alert severity="error" elevation="0">{this.state.message}</Alert>}
				     {this.state.success &&  <Alert severity="success" elevation="0">{this.state.message}</Alert>}	
                    <TextField name="firstName" label="First name" value={this.state.firstName} variant="outlined" onChange={this.handleInputChange} required/>
					<TextField name="lastName" label="Last name" value={this.state.lastName} variant="outlined" onChange={this.handleInputChange} required/>
              	    <TextField name="email" label="Email" value={this.state.email} variant="outlined" onChange={this.handleInputChange} required/>
  				    <TextField name="password" label="Password" value={this.state.password} variant="outlined" onChange={this.handleInputChange} type="password" required/>
					<TextField name="confirm" label="Confirm Password" value={this.state.confirm} variant="outlined" onChange={this.handleInputChange} type="password" required/>
                    <Button variant="contained" onClick={this.handleSubmit}>Sign Up</Button>
					 
       			</Stack>
				</>
        );
    }
}

export default withStyles(useStyles)(Signup)