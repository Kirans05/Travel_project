import React, { Component } from 'react';
import './Home.css';
import {Paper, FormControl,  TextField, Autocomplete, Stack, Button, Grid} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DatePicker from '@mui/lab/DatePicker';

class SearchBar extends Component {
	constructor(props) {
        super(props);
		this.state = {
			fromDate: null,
			toDate: null,
			destination: null,
		}
		this.setFrom = this.setFrom.bind(this);
		this.setTo = this.setTo.bind(this);
		this.search = this.search.bind(this);
		this.setDest = this.setDest.bind(this);
	}
	setFrom(val){
		this.setState({fromDate: val});
	}
	setDest(val) {
        this.setState({destination :val});
    }
	setTo(val){
		this.setState({toDate: val});
	}
	search() {
		this.props.searchFn(this.state.fromDate, this.state.toDate, this.state.destination);
	}
	render() {
		const destinations = [
			 "London" , "Lagos" , "Dubai"
		];
        return (
			<Paper elevation={6} style={{padding: '15px'}}>
			  <Grid container spacing={1}>	
				  <Grid item>
				  <Autocomplete
				      disablePortal
				      id="combo-box-demo"
					  name="destination"
				      options={destinations}
					  onChange={(event, newValue) => {
				          this.setDest(newValue);
				       }}
					  sx={{ width: 300 }}
					  renderInput={(params) => <TextField {...params} size="small"  label="Where are you going?" />}
					/>
				 </Grid>
				 <Grid item>
				  <LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
					    label="From"
					    value={this.state.fromDate} 
						name="fromDate"
					    onChange={this.setFrom}
					    renderInput={(params) => <TextField size="small" {...params} />}
					  />
				 </LocalizationProvider>
				 </Grid>
				 <Grid item>
				 
				 <LocalizationProvider dateAdapter={AdapterDateFns}> 
					<DatePicker
					    label="To"
					    value={this.state.toDate}
						name="toDate"
					    onChange={this.setTo}
					    renderInput={(params) => <TextField size="small"  {...params} />}
					  />
				 </LocalizationProvider>
			</Grid>
				 <Grid item> 
				 <Button onClick={this.search} variant="contained" color="primary" sx={{minWidth: "200px"}}> Go !   </Button>
			      </Grid>				 
				 
				</Grid>
			</Paper> 
		)
	}
}
export default SearchBar;