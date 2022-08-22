import React, { Component } from 'react';
import './Home.css';
import { Card,CardMedia,CardContent, CardActions, CardActionArea, TextField, Typography, Stack,Button, Grid,Box  } from '@mui/material';
import {allProducts} from '../util/APIUtils';
 
class Results extends Component {
	constructor(props) {
        super(props);
		this.state = {
			results: [],
			usdToAll: new Map([
				['NGN', 410.85],
				['EUR', 0.86],
				['GBP', 0.73],
			]),
			eurToAll: new Map([
				['NGN', 476.52],
				['USD', 1.16],
				['GBP', 0.85],
			]),
			ngnToAll: new Map([
				['USD', 0.024],
				['EUR', 0.021],
				['GBP', 0.018],
			]),
			gbpToAll: new Map([
				['USD', 1.37],
				['EUR', 1.18],
				['NGN', 561.77],
			]),
		}
	 	this.book = this.book.bind(this);
		this.reloadProducts = this.reloadProducts.bind(this);
	}
	componentDidMount() {
		this.reloadProducts();
	}
	
	reloadProducts() {
		allProducts().then(res => {
			this.setState({results: res});
		})
	}
	
	calcaulateCurrencyDifferrence(targetCurr, originalCurr, amount) {
		if(targetCurr == originalCurr) {
			return amount;
		}
		if(originalCurr === 'USD') {
			return amount * this.state.usdToAll.get(targetCurr);
		}else if(originalCurr ==='GBP') {
			return amount * this.state.gbpToAll.get(targetCurr);
		}else if(originalCurr ==='EUR') {
			return amount * this.state.eurToAll.get(targetCurr);
		}else if(originalCurr ==='NGN') {
			return amount * this.state.ngnToAll.get(targetCurr);
		}
		return amount;
	}
	
	book(selected) {		 
		this.props.bookFn(selected);
	}

    render() {
        return ( 
			<Box align="center">
			 <Grid container spacing={1} style={{marginTop: '2em'}} justifyContent="space-evenly">
				{this.state.results.map((row) => 
				<>
				 {( row.city == this.props.destination || this.props.destination == null) &&
				  <Grid item >
					<Card sx={{ maxWidth: 345, minHeight: 430, maxHeight: 430, display: 'flex', flexDirection: 'column'}} variant="outlined">
						<CardMedia
							component="img"
							height="180"
							image={row.imageUrl}
							alt={row.name}
						/>
						<CardContent sx={{flexGrow: "1"}}>
							<Typography gutterBottom variant="h6" component="div">
								{row.name}
        					</Typography>
							<Typography variant="body2" color="text.secondary">
								{row.description}
        					</Typography>
 
						</CardContent> 
							<CardActions>
								<Button size="small" variant="contained" onClick={(r) => this.book(row)}>
									{this.props.currency === "USD"? "$" : (this.props.currency==="EUR"? "€" : (this.props.currency === 'NGN'? '₦': '£'))} 
									{this.calcaulateCurrencyDifferrence(this.props.currency, row.currency, row.price).toLocaleString(undefined, {minimumFractionDigits:2})} : Book Now
								</Button>
							</CardActions> 
					</Card>
					</Grid>}
					</>
				) }
				</Grid> 
				</Box>
        )
    }
}

export default Results;