import React, { Component } from 'react';
import {
  Route,
  Switch,BrowserRouter
} from 'react-router-dom';
import LoadingIndicator from '../common/LoadingIndicator';
import './App.css';

import { createTheme , ThemeProvider} from '@mui/material/styles';
import { withStyles } from '@mui/styles'; 
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/Profile';
import AppHeader from '../common/AppHeader';
import Checkout from '../order/Checkout';
import AddTour from '../product/AddTour';
import OrderHistory from '../order/OrderHistory';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import red from '@mui/material/colors/red';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants/Constants';
import PrivateRoute from '../common/PrivateRoute';
import CssBaseline from '@mui/material/CssBaseline';
import Terms from '../legal/Terms';
import Privacy from '../legal/Privacy';
import ChangePassword from '../user/login/ChangePassword';
import NotFound from '../common/NotFound';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import CookieConsent from "react-cookie-consent";

const theme = createTheme({
	  palette: {
	    primary: {
	      main: '#1F2C5D',
	    },
	     secondary: {
	      main: red[500],
	    },
	  },
	});
const useStyles = theme => ({
	
  root: {
    display: 'flex',
  },
 content: {
    flexGrow: 1,
	paddingTop: '1em',
	paddingBottom: '1em',
    overflow: 'auto',
  },
footerBar: {
    top: 'auto',
    bottom: 0,
	height: '50px',
	opacity: "0.5",
	zIndex: '-1',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
	  active: false,
      currentUser: null,
      loading: false,
	  fromDate: null,
	  toDate: null,
	  destination: null,
	  tour: null,
	  currency: 'USD',
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
	this.setAuthenticated = this.setAuthenticated.bind(this);
	this.syncState = this.syncState.bind(this);
	this.syncCurrency = this.syncCurrency.bind(this);
  }
  syncState(fromDateVal, toDateVal, destinationVal, tourVal, currencyVal ) {	
	this.setState({fromDate: fromDateVal, toDate: toDateVal, destination: destinationVal, tour: tourVal })
  }
	syncCurrency(targetCurr){
		this.setState({currency: targetCurr});
	}
  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
    .then(response => {

      this.setState({
        currentUser: response,
        authenticated: true,
		active: response.active,
        loading: false
      });

    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
	window.location.href = "/login";
   // Alert.success("You're safely logged out!");
  }
	setAuthenticated() {
		this.setState({authenticated: true});
		this.loadCurrentlyLoggedInUser();
	}
  componentDidMount() {
	document.body.style.backgroundColor = "#EEEEE8";
    this.loadCurrentlyLoggedInUser();
  }
 
  render() {
	const { classes } = this.props; 
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
	<ThemeProvider theme={theme}>
	   <BrowserRouter>
		 <div className={classes.root}>
	       <main className={classes.content}>
			   <div className={classes.toolbar}> </div>
			   	
	 			  <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} currentUser={this.state.currentUser} syncCurrency={this.syncCurrency}/>	
		          <Switch> 
	         		<Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
					{/*<PrivateRoute path="/teams" authenticated={this.state.active} currentUser={this.state.currentUser}
		              component={Teams} props={this.props}></PrivateRoute>*/}
		            <Route path="/login"
		              render={(props) => <Login authenticated={this.state.authenticated} {...props}  aftersuccess={this.setAuthenticated}/>}></Route>
		            <Route path="/signup"
		              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
					<PrivateRoute path="/addTour" authenticated={this.state.active} currentUser={this.state.currentUser}
		              component={AddTour} props={this.props}></PrivateRoute>
					<PrivateRoute path="/orderHistory" authenticated={this.state.active} currentUser={this.state.currentUser}
		              component={OrderHistory} props={this.props}></PrivateRoute>
					<PrivateRoute path="/checkout"  authenticated={this.state.active} currentUser={this.state.currentUser}  currency={this.state.currency} 
							component={Checkout} tour={this.state.tour} aftersuccess={this.setAuthenticated} props={this.props}></PrivateRoute>
					<PrivateRoute path="/profile"  authenticated={this.state.active} currentUser={this.state.currentUser} component={Profile} props={this.props}></PrivateRoute>
					<Route path="/terms" render={(props) => <Terms authenticated={this.state.authenticated} {...props}  aftersuccess={this.setAuthenticated}/>}></Route>					
					<Route path="/privacy" render={(props) => <Privacy authenticated={this.state.authenticated} {...props}  aftersuccess={this.setAuthenticated}/>}></Route>
					<Route path="/changePassword" render={(props) => <ChangePassword authenticated={this.state.authenticated} {...props}  />}></Route>
					
					<Route exact path="/" render={(props) => <Home active={this.state.active} authenticated={this.state.authenticated} currency={this.state.currency} syncState = {this.syncState} {...props} />}></Route>
		            <Route component={NotFound}></Route>				
		          </Switch>
				
			 	
	        </main>
			<Alert stack={true} timeout={3000} />
			<CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
		  </div>
		 </BrowserRouter>	
		</ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(App);
