import React, { Component } from 'react';
import './Home.css';
import { Snackbar } from '@mui/material';
import {APP_NAME } from '../constants/Constants';
import SearchBar from './SearchBar';
import Results from './Results';
import {Container, Paper, Box, Stack} from '@mui/material'; 

 
class Home extends Component {
	constructor(props) {
        super(props);
		this.state = {
			fromDate: null,
			toDate: null,
			destination: null,
			tour: null,
		}
		this.setFrom = this.setFrom.bind(this);
		this.setTo = this.setTo.bind(this);
		this.search = this.search.bind(this);
		this.bookFn = this.bookFn.bind(this);
		this.setCurrency = this.setCurrency.bind(this);
	}
	
	setFrom(val){
		this.setState({fromDate: val});
	}
	
	setTo(val){
		this.setState({toDate: val});
	}
	search(from, to, dest) {
		 this.setState({destination: dest});
	}
	bookFn(selTour) {
		this.setState({tour: selTour});
		this.props.syncState(this.state.fromDate, this.state.toDate, this.state.destination, selTour);
		setTimeout(() => {
			this.props.history.push({
	            pathname: '/checkout',
	            state: null,
	        });}, 100);
		
	}
	setCurrency(val){
		this.setState({currency: val});
	}

    render() {
        return (
	
             <Container component="main" maxWidth="lg">
				<Snackbar
			        anchorOrigin={{ vertical: 'center', horizontal: 'center' }} style={{zIndex: 1}}
			        open={!this.props.active && this.props.authenticated}
			        message="Your account is not active, we are checking your details, please try again in some time. Thank you!"
			      />
               	  
                   <Box align="center"> <h1 className="home-title">Let {APP_NAME} book the tour of your dreams!</h1> </Box>
				 
                  <SearchBar searchFn={this.search}/>
				  <Results destination={this.state.destination} bookFn={this.bookFn} currency={this.props.currency}/>
				 
           </Container>
        )
    }
}

export default Home;