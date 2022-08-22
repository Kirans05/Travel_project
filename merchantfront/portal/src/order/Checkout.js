import React, { Component } from 'react';
import {Container, Paper, Box, Avatar, Typography, Divider, Grid, Stack, TextField, Button} from '@mui/material';
import CreditCardInput from 'react-credit-card-input';
import { Link, Redirect, } from 'react-router-dom'
import { processOrder } from '../util/APIUtils';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Alert from '@mui/lab/Alert';

class Checkout extends Component {
	constructor(props) {
        super(props);
		this.state = {
			cardHolderName: null,
			cardNumber: '',
			cardExpiry: null,
			cardCvv: null,
			nameErr: false,
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
			errMsg: '',
			cardErr: false,
			paymentSuccess: false,
			paymentFailed: false,
			paymentError: null, 
			fromDate: null,
			toDate: null,
			adultQty: 0,
			childQty: 0,
			adultQtyErr: false,
			childQtyErr: false,
			totalAmount: null,
			order: null,
			failed: false,
			errMsgAdult: null,
			dateFromErr: false,
			dateToErr: false,
			errMsgFromDate: null,
			errMsgToDate: null,
			
		}
		this.handleCardHolderChange = this.handleCardHolderChange.bind(this);
		this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
		this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
		this.handleCardCvvChange = this.handleCardCvvChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.setFrom = this.setFrom.bind(this);
		this.setTo = this.setTo.bind(this); 
		this.handleAdultQtyChange = this.handleAdultQtyChange.bind(this);
		this.handleChildQtyChange = this.handleChildQtyChange.bind(this);
		this.calcaulateCurrencyDifferrence = this.calcaulateCurrencyDifferrence.bind(this);
	}
	componentDidMount() {
		this.setState({totalAmount: this.calcaulateCurrencyDifferrence(this.props.currency, this.props.tour.currency, this.props.tour.price)
						.toLocaleString(undefined, {minimumFractionDigits:2})})
	}
	setFrom(val){
		this.setState({fromDate: val});
	}
	setTo(val){
		this.setState({toDate: val});
	}
	handleCardHolderChange(val){
		this.setState({nameErr: false, errMsg: '',failed: false});
		this.setState({cardHolderName: val.target.value});
	}
	handleCardNumberChange(val){		
		this.setState({cardErr: false,failed: false});
		this.setState({cardNumber: val.target.value});
	}
	handleCardExpiryChange(val){
		this.setState({cardErr: false,failed: false});
		this.setState({cardExpiry: val.target.value});
	}
	handleCardCvvChange(val) {
		this.setState({cardErr: false,failed: false});
		this.setState({cardCvv: val.target.value});
	}
	handleAdultQtyChange(val){
		var qty = val.target.value;
		
		
		if(qty == null || qty === '' || parseInt(qty) < 1) {
			this.setState({adultQty: parseInt(1)});
			return;
		}
		this.setState({adultQty: parseInt(qty)});
		this.setState({totalAmount: this.calcaulateCurrencyDifferrence(this.props.currency, this.props.tour.currency, (this.props.tour.price * (parseInt(qty) + this.state.childQty))).toLocaleString(undefined, {minimumFractionDigits:2})});
		
	}
	handleChildQtyChange(val){
		var qty = val.target.value;
		
		
		if(qty == null || qty === '' || parseInt(qty) < 1 ) {
			this.setState({childQty: parseInt(0) });
			return;
		}
		this.setState({childQty: parseInt(qty) });
		this.setState({totalAmount: this.calcaulateCurrencyDifferrence(this.props.currency, this.props.tour.currency, (this.props.tour.price * (parseInt(qty) + this.state.adultQty))).toLocaleString(undefined, {minimumFractionDigits:2})});
	}
	handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
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
	handleSubmit() {
		this.setState({adultQtyErr: false, dateToErr: false, dateFromErr: false, nameErr: false, cardErr: false, errMsgAdult: null, errMsgFromDate: null, errMsgToDate: null, errMsg: null})
		if(this.state.adultQty < 1) {
			this.setState({adultQtyErr: true, errMsgAdult: 'Please enter Adult qty'});
			return false;
		}
		if(this.state.fromDate == null || this.state.fromDate === '' ) {
			this.setState({dateFromErr: true, errMsgFromDate: 'Please enter from date'});
			return false;
		}
		if(this.state.toDate == null || this.state.toDate === '' ) {
			this.setState({dateToErr: true, errMsgToDate: 'Please enter to date'});
			return false;
		}
		if(this.state.cardHolderName == null || this.state.cardHolderName === '') {
			this.setState({nameErr: true, errMsg: 'Please enter card holder name'});
			return false;
		}
		if(this.state.cardNumber == null || this.state.cardNumber === '') {
			this.setState({cardErr: true});
			return false;
		}
		
		const req = {
			cardHolderName: this.state.cardHolderName,
			cardNumber: this.state.cardNumber,
			cardExpiry: this.state.cardExpiry,
			cardCvv: this.state.cardCvv,
			productId: this.props.tour.id,
			quantity: 1,
			currency: this.props.currency,
			amount: this.state.totalAmount,
			fromDate: this.state.fromDate,
			toDate: this.state.toDate,
			adultQty: this.state.adultQty,
			childQty: this.state.childQty,
		};
 
		const orderReq = Object.assign({}, req);
 
		processOrder(orderReq).then(res => {			
			if(res.success == true) {
				this.setState({order: res.order, paymentSuccess: true})		
			} else {
				this.setState({failed: true, errMsg: 'Payment failed !'})	
			}			
		}).catch(error => {
            this.setState({failed: true, errMsg: 'Payment failed !'})	            
        });
		
	}
	
    render() { 
		if(this.props.tour == null) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }
		const { classes } = this.props;
		 	

        return (
			 <Container component="main" maxWidth="lg">
			  <Box align="center"> <h1 className="home-title">Order confirmation and Payment</h1> </Box>
          	  <Paper style={{padding: '2em'}}>
				<Typography variant="h6">Tour Details</Typography>
				<Divider />
				{this.state.failed &&  <Alert severity="error" elevation="0">{this.state.errMsg}</Alert>}
				<Grid container xs={12} spacing={2} style={{marginTop: '1em', marginBottom: '2em'}}>
					<Grid item xs={3}>
						<Avatar alt="Image" src={this.props.tour.imageUrl}  variant="square" sx={{ width: 210, height: 215 }}/>
					</Grid>
					<Grid item xs={9}>
						<Stack direction="column" spacing={4}>
							<Typography variant="h6">{this.props.tour.name} </Typography>
							<Typography variant="caption"> {this.props.tour.description}</Typography>
							<Typography variant="subtitle2" style={{ fontWeight: 600 }}> Price : {this.state.totalAmount} {' ' + this.props.currency}</Typography>
						</Stack>
					</Grid>
				</Grid>
				<Divider style={{marginBottom: '2em'}}/>
				{this.state.paymentSuccess == false &&
				<>
					<Typography variant="h6" style={{marginBottom: '1em'}}>Itinerary details</Typography>
					<Container maxWidth="sm" >					 
						<Stack spacing={2} >
							<TextField name="adultQty" label="Number of adults travelling" onChange={this.handleAdultQtyChange} size="small" required 
								error={this.state.adultQtyErr} helperText={this.state.errMsgAdult} type="number" value={this.state.adultQty}/>
						    <TextField name="childQty" label="Number of children travelling" onChange={this.handleChildQtyChange} size="small" required 
								error={this.state.childQtyErr} helperText={this.state.errMsgChild} type="number" value={this.state.childQty}/>
					        <LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
								    label="Start date"
								    value={this.state.fromDate} 
									name="fromDate"
								    onChange={this.setFrom}
								    renderInput={(params) => <TextField {...params} error={this.state.dateFromErr} helperText={this.state.errMsgFromDate} />}
								  />
							 </LocalizationProvider>
							 
							 <LocalizationProvider dateAdapter={AdapterDateFns}> 
								<DatePicker
								    label="End date"
								    value={this.state.toDate}
									name="toDate"
								    onChange={this.setTo}
								    renderInput={(params) => <TextField {...params} error={this.state.dateToErr} helperText={this.state.errMsgToDate}/>}
								  />
							 </LocalizationProvider>
						</Stack>
					</Container>
					<Divider style={{marginBottom: '2em', marginTop: '2em'}}/>
					<Typography variant="h6" style={{marginBottom: '1em'}}>Payment details</Typography>
					<Container maxWidth="sm" >					 
						<Stack spacing={2} >
							<TextField name="cardHolderName"  label="Card holder name" 
								onChange={this.handleCardHolderChange} size="small" 
								required error={this.state.nameErr} 
								helperText={this.state.errMsg}/>
							<CreditCardInput required fieldStyle={{border: '1px solid  #cccccc'}}
									cardNumberInputProps={{ value: this.state.cardNumber, onChange: this.handleCardNumberChange }}
		 							cardExpiryInputProps={{ value: this.state.cardExpiry, onChange: this.handleCardExpiryChange }}
		  							cardCVCInputProps={{ value: this.state.cardCvv, onChange: this.handleCardCvvChange }}
							/>
							{this.state.cardErr && 
								<Typography variant="caption" color="red">Credit card details are mandatory</Typography>
							}
							<Button variant="contained" onClick={this.handleSubmit}>Pay</Button>
						</Stack>
					</Container>
					
				</>
				}
				{this.state.paymentSuccess == true &&
					<>
						<Divider style={{marginBottom: '2em'}}/>
						<Typography variant="h6" style={{marginBottom: '2em'}}>Transaction details</Typography>
						<Container maxWidth="sm" >
							<Stack spacing={2} >
								<Typography variant="body2">Thank you, we have received your order and we are working on it, you will receive the tour confirmation within 72 hours, for any reason if we are not able to fulfil your tour we will refund your full money back</Typography>
								<Typography variant="body2">Order Status : Success </Typography>
								<Typography variant="body2">Order Number : {this.state.order.orderId} </Typography>
								<Typography variant="body2">Order Amount : {this.state.order.amount} </Typography>
								<Button variant="contained" href="/" >Home</Button>
							</Stack>
							
							
						</Container>
					</>
				}
				
			  </Paper>
			</Container>
        );
    }
}
 
export default Checkout;