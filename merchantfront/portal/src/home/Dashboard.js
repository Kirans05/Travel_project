import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import {Card,CardContent,CardHeader,Divider,Grid, TextField,Select ,MenuItem, InputLabel, FormControl, Checkbox, Chip} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'; 
import Alert from 'react-s-alert';
import { fetchUserMembership} from '../../util/APIUtils';



const useStyles = theme => ({
    
 	formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  	},
	displayGrid: {
		marginTop: theme.spacing(2),
	}, 
	topCard: {
	 marginTop: theme.spacing(1),
	},
	payButton : {
		 margin: theme.spacing(2),
	},
});

class Dashboard extends Component {
	
	constructor(props) {
        super(props);
		this.state = {
		}
	}
	
	render() {
	const { classes } = this.props;
		return (
			<Container component="main" maxWidth="md">
			
			
			
			</Container>
	);}
}

export default withStyles(useStyles)(Dashboard)