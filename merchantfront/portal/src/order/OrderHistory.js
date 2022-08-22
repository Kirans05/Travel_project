import React, { Component } from 'react';
import {Container, Paper, Box, Avatar, Typography, Divider, Grid, Stack, TextField, Button} from '@mui/material';
import {orderHistoryByUserId} from '../util/APIUtils';


import CreditCardInput from 'react-credit-card-input';
import { Link, Redirect, } from 'react-router-dom'

class OrderHistory extends Component {
	constructor(props) {
        super(props);
		this.state = {
      		items: null,
	        isLoaded: false,
			 
		} 
		this.handleSubmit = this.handleSubmit.bind(this);
		this.reloadOrders = this.reloadOrders.bind(this);
	}
	 
	handleSubmit() {
		 
	}

  componentDidMount() {
    	this.reloadOrders();
    
	}

  reloadOrders() {

    orderHistoryByUserId().then(res => {
			this.setState({items: res});
		})
  };
      

	 

    render() { 
 
		const { classes } = this.props;    

        return (
			 <Container component="main" maxWidth="lg"> 
       <div>{JSON.stringify(this.state.items)}
       
       </div>
			 <Box align="center"> <h1 className="home-title">Order history</h1> </Box>
          	  <Paper style={{padding: '2em'}}>
				<Typography variant="h6">Details   </Typography>
				<Divider />
				 


					{
						this.state.items.map((order) => (<div >

							<Paper style={{ padding: '1em', marginTop: "1%", backgroundColor: "#D3D3D3" }} key={order.orderId} >

								<Typography style={{ color: "#4A274F" }} variant="h7">
									userId: {order.userId} &emsp;&emsp;    productId: {order.productId}  &emsp;&emsp;     quantity: {order.quantity}  &emsp;&emsp;     price: {order.price}

									<Button style={{ color: "#fff", backgroundColor: "#097b7d", marginLeft: "89%" }} variant="contained">Buy Again</Button>
								</Typography>

							</Paper> </div>))
				}
        
           </Paper>
	  
				
			  
			  
			</Container>
        );
    }
}
 
export default OrderHistory;