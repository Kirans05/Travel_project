import React, { Component } from 'react';
import './Login.css';
import { changePass, changePassToken } from '../../util/APIUtils';
import { withStyles } from '@mui/styles';
import { object, ref, string } from 'yup';
import Alert from 'react-s-alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TypoGraphy from '@mui/material/Typography';


import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { Formik } from 'formik'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import queryString from 'query-string';
    


const useStyles = theme => ({


	avatar: {

	},
	paper: {
		marginTop: theme.spacing(8),
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},

});

class ChangePassword extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
	}

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				<Container component="main" maxWidth="xs">
					<Paper elevation={3} className={classes.paper}>
						<div align="center">
							<TypoGraphy variant="h6">Change password</TypoGraphy>
						</div>
						<div className={classes.form}>
							<ChangePassForm {...this.props} authenticated={this.props.authenticated} />
						</div>
					</Paper>
				</Container>
			</React.Fragment>
		);
	}
}

class ChangePassForm extends Component {

	constructor(props) {
		super(props);
		let params = queryString.parse(this.props.location.search)
		this.state = {
			password: '',
			passwordConfirm: '',
			token: params.token,
			
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this.linkRedirect = React.createRef();
	}

	handleInputChange(event) {
		const target = event.target;
		const inputName = target.name;
		const inputValue = target.value;

		this.setState({
			[inputName]: inputValue
		});
	}
	
 
	_handleSubmit= ({	    
	    newPass,
	    confirmPass,
	    setSubmitting,
		resetForm
	  }) => {
		this.setState({password: newPass});
		const changePassRequest = Object.assign({}, this.state);
		if (this.state.token) {
			changePassToken(changePassRequest)
				.then(response => {
					Alert.success("Password changed successfully !");
					window.location.href = "/";
				}).catch(error => {
					Alert.error((error && error.message) || 'Error changing password : ' + error.message);
				});
		} else {
			changePass(changePassRequest)
				.then(response => {
					Alert.success("Password changed successfully !");
					window.location.href = "/";
				}).catch(error => {
					Alert.error((error && error.message) || 'Error changing password: ' + error.message);
				});
		}

	}

	render() {

		return (

			<Formik initialValues = {{						
						newPass: '',
						confirmPass: '',
			        }
				}
				validationSchema = {
					object().shape({
						newPass: string().required('New password is required').matches(
							/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
						),
						confirmPass: string()
							.oneOf([ref('newPass')], 'Passwords do not match')
							.required('Password is required'),
					})
				}
				onSubmit = {(
					{ newPass, confirmPass },
					{ setSubmitting, resetForm }
				) =>
			          this._handleSubmit({
					newPass,
					confirmPass,
					setSubmitting,
					resetForm
				})
			        }
			render = { props => {
				const {
					values,
					touched,
					errors,
					handleChange,
					handleBlur,
					handleSubmit,
					isValid,
					isSubmitting,
				} = props
				return isSubmitting ? (
					 <div
				      style={{
				        display: 'flex',
				        flexDirection: 'column',
				        justifyContent: 'center',
				        alignItems: 'center',
				        height: '500',
				      }}
				    >
				      <CircularProgress color="primary" />
				    </div>
				) : (

		 

				<form onSubmit={handleSubmit}>
 
					<FormControl
						fullWidth
						margin="dense"
						error={Boolean(touched.newPass && errors.newPass)}
					>
						<InputLabel
							htmlFor="password-new"
							error={Boolean(touched.newPass && errors.newPass)}
						>
							{'New Password'}
						</InputLabel>
						<Input
							id="password-new"
							name="newPass"
							type="password"
							value={values.newPass}
							onChange={handleChange}
							onBlur={handleBlur}
							error={Boolean(touched.newPass && errors.newPass)}
						/>
						<FormHelperText
							error={Boolean(touched.newPass && errors.newPass)}
						>
							{touched.newPass && errors.newPass ? errors.newPass : ''}
						</FormHelperText>
					</FormControl>
					<FormControl
						fullWidth
						margin="dense"
						error={Boolean(touched.confirmPass && errors.confirmPass)}
					>
						<InputLabel
							htmlFor="password-confirm"
							error={Boolean(touched.confirmPass && errors.confirmPass)}
						>
							{'Confirm Password'}
						</InputLabel>
						<Input
							id="password-confirm"
							name="confirmPass"
							type="password"
							value={values.confirmPass}
							onChange={handleChange}
							onBlur={handleBlur}
							error={Boolean(touched.confirmPass && errors.confirmPass)}
						/>
						<FormHelperText
							error={Boolean(touched.confirmPass && errors.confirmPass)}
						>
							{touched.confirmPass && errors.confirmPass
								? errors.confirmPass
								: ''}
						</FormHelperText>
					</FormControl>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disabled={Boolean(!isValid || isSubmitting)} fullWidth
						style={{ marginTop: '2em' }}
					>
						{'Change Password'}
					</Button>
				</form>
			 
		)
}}
/>
		  
		
        );
    }
}

export default withStyles(useStyles)(ChangePassword)
