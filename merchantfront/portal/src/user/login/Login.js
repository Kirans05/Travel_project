import React, { Component } from 'react';
import './Login.css';
import {ACCESS_TOKEN, APP_NAME } from '../../constants/Constants';
import { login, resetPass } from '../../util/APIUtils';
import { Link, Redirect, } from 'react-router-dom'
import { withStyles } from '@mui/styles'; 
import Alert from '@mui/lab/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';  
 
const useStyles = theme => ({
 

   avatar: {
        margin: theme.spacing(1),
       backgroundColor: theme.palette.secondary.main,
    },
	paper: {
        marginTop: '8em',
		padding : '2em',
        
     },
	form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '1em',
        marginBottom: '1em',
    },
 	
});

class Login extends Component {
	 constructor(props) {
        super(props);
    }
    componentDidMount() {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                Alert.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
   
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
							<Avatar className={classes.avatar}>
		                        <LockOutlinedIcon />
		                    </Avatar>
							<Typography variant="h6">Login to {APP_NAME}</Typography>
						</div> 
					 	<LoginForm {...this.props} authenticated={this.props.authenticated}/> 
            		</Paper> 
		 	</Container>
        );
    }
}

class LoginForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
		    failed: false,
			message: null,
			success: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.linkRedirect = React.createRef();
		this.handleResetPass = this.handleResetPass.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }
	
	 handleResetPass() {
		if(this.state.email && this.state.email != '') {
			const loginRequest = Object.assign({}, this.state);
			resetPass(loginRequest)
			.then(response => {
				if(response.success)
					this.setState({failed: false,success: true, message: 'Password reset link has been sent to the email , please check!'});
				else 
					this.setState({failed: true, success:false , message: "Error- " + response.message}); 
			}).catch(error => {
				  Alert.error((error && error.message) || "Error: " + error.error);
			});
		}
	}
    handleSubmit(event) {
        event.preventDefault();  
	    if(this.state.email == null || this.state.email === ''){
			this.setState({failed: true, success:false, message: 'Please enter Email'});
			return;
		} 
		if(this.state.password == null || this.state.password === ''){
			this.setState({failed: true, success:false, message: 'Please enter Password'});
			return;
		}
        const loginRequest = Object.assign({}, this.state);

        login(loginRequest)
        .then(response => {
		 
				 localStorage.setItem(ACCESS_TOKEN, response.accessToken);
	             this.setState({failed: false, success:true, message: 'Login successful!'});
				 this.props.aftersuccess();		
			 
        }).catch(error => {
			this.setState({failed: true, success:false, message: 'Failed! Please check email and password'});
        });
    }
    
    render() {
	 const { classes } = this.props;
        return (
				<>
				{this.state.failed &&  <Alert severity="error" elevation="0">{this.state.message}</Alert>}
				{this.state.success &&  <Alert severity="success" elevation="0">{this.state.message}</Alert>}
               <Stack className={classes.form} spacing={2}> 
				 <TextField label="Email" variant="outlined" value={this.state.email} onChange={this.handleInputChange} name="email" required/>
                 <TextField label="Password" variant="outlined" value={this.state.password} onChange={this.handleInputChange} name="password" type="password" required />
                 <Button variant="contained" onClick={this.handleSubmit}> Submit </Button>
 				</Stack>  	
				<div className="signup-link" align="center">
					{ !this.props.authenticated ? 
						(<>New user? <Link to="/signup">Sign up!</Link></>)
						:(<></>)
					} 
					&nbsp; Or <Link onClick={this.handleResetPass}>Reset password</Link>
				</div> 
               </>        
        );
    }
}

export default withStyles(useStyles)(Login)
