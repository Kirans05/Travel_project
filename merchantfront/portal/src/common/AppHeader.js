import React from 'react';
import {APP_NAME } from '../constants/Constants';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar'; 
import { Link, NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import {Menu, MenuItem, IconButton, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
//import cccLogo from '../img/ccc_small.png';
import Power from '@mui/icons-material/PowerSettingsNew';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoreIcon from '@mui/icons-material/MoreVert';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CricketIcon from '@mui/icons-material/SportsCricket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    
  },
  input: {
    color: "white"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  buttonName:{
		[theme.breakpoints.down('md')]: {
     		 fontSize: 11,
    	},
		[theme.breakpoints.up('md')]: {
     		 fontSize: 14,
    	},
	},
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'flex',
  },
}));



export default function AppHeader(props) {
  	const classes = useStyles();

	const [anchorEl,setAnchorEl] = React.useState(null);
 	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [anchorGeneralEl, setAnchorGeneralEl] = React.useState(null);	
	const [currency, setCurrency] = React.useState("USD");
	const mobileMenuId = 'primary-search-account-menu-mobile';
	const menuId = 'primary-search-account-menu';
	const genMenuId = 'primary-search-account-menu-general';
    const isMenuOpen = Boolean(anchorEl);
	const isGenMenuOpen = Boolean(anchorGeneralEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
    	setMobileMoreAnchorEl(null);
 	 };
	const handleDesktopMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleGeneralMenuOpen = (event) => {
		setAnchorGeneralEl(event.currentTarget);
	};
	const handleMobileMenuOpen = (event) => {
    	setMobileMoreAnchorEl(event.currentTarget);
  	};
	 const handleMenuClose = () => {
	    setAnchorEl(null);
		setAnchorGeneralEl(null);
	    handleMobileMenuClose();
	  };
	const currencies = [
	  {
	    value: 'USD',
	    label: '$',
	  },
	  {
	    value: 'EUR',
	    label: '€',
	  },
	  {
	    value: 'NGN',
	    label: '₦',
	  },
	];
	const handleChange = (event) => {
		props.syncCurrency(event.target.value);
    	setCurrency(event.target.value);
  	};
 	const renderDesktopMenu = (
		    <Menu
		      anchorEl={anchorEl}
		      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		      id={menuId}
		      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		      open={isMenuOpen}
		      onClose={handleMenuClose}
			 onClick={handleMenuClose}
		    >
		     <MenuItem>
				<Button color="inherit" to="/terms" component={Link} startIcon={<AssignmentTurnedInIcon />} >Terms & Conditions</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" to="/privacy" component={Link} startIcon={<VpnLockIcon />}>Privacy policy</Button>
			</MenuItem>
		    </Menu>
		  );

	const renderMobileMenu = (
		<Menu anchorEl={mobileMoreAnchorEl}
		      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		      id={mobileMenuId}
			  onClick={handleMobileMenuClose}
		      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		      open={isMobileMenuOpen}
		      onClose={handleMobileMenuClose}>
			<MenuItem>
				<Button color="inherit" to="/profile" component={Link} startIcon={<AccountBoxIcon />} >Profile</Button>
			</MenuItem>
			{props.currentUser && props.currentUser.admin && 
				<MenuItem>
					<Button color="inherit" to="/addTour" component={Link} startIcon={<AddIcon />}>Add tour</Button>
				</MenuItem>
			}
			<MenuItem>
					<Button color="inherit" to="/orderHistory" component={Link} startIcon={<HistoryIcon />}>Order history</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" to="/terms" component={Link} startIcon={<AssignmentTurnedInIcon />} >Terms & Conditions</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" to="/privacy" component={Link} startIcon={<VpnLockIcon />}>Privacy policy</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" onClick={props.onLogout} component={Link} startIcon={<Power />}>Logout</Button>
			</MenuItem>
		</Menu>
	);
  return (
    
      <AppBar className={classes.appBar}>
        <Toolbar>
		 {/* <img alt="Croydon CC" src={cccLogo} width="40px" height="52px" style={{marginBottom: 0.5+'em', marginRight: 1 + 'em'}}/>*/}
          <Typography variant="subtitle" color="inherit" className={classes.title}>
            <Button  startIcon={<HomeIcon />} color="inherit" to="/" href="./" component={Link} className={classes.buttonName}>{APP_NAME}</Button>
          </Typography>
			 <TextField
			          id="select-currency"
			          select size="small"
			          value={currency}
					  inputProps={{  className: classes.input  }}
			          onChange={handleChange} sx={{background: "#D2CCff", marginRight: '1em'}}
			        >
			          {currencies.map((option) => (
			            <MenuItem key={option.value} value={option.value}>
			              {option.label}{' '}{option.value}
			            </MenuItem>
			          ))}
			        </TextField>
		    { props.authenticated ? (
			<>
				<div className={classes.sectionMobile}>
					
		            <IconButton
		              aria-label="show more"
		              aria-haspopup="true"
		              onClick={handleMobileMenuOpen}
		              color="inherit"
		            >
		              <AccountCircleIcon />
		            </IconButton>
		          </div>
			</>

			): ( 
				<>
				  
		          <Button color="inherit" to="/login"  component={Link} className={classes.buttonName}>login</Button>
				  <Button color="inherit" to="/signup" component={Link} className={classes.buttonName}>Signup</Button>
				   <IconButton
		              aria-label="show more"
					  aria-controls="primary-search-account-menu"
		              aria-haspopup="true"
		              onClick={handleDesktopMenuOpen}
		              color="inherit"
		            >
		              <MoreIcon />
		            </IconButton>
				</>
		 )}
        </Toolbar>
		 {renderMobileMenu}
		 {renderDesktopMenu}		
		 
      </AppBar>
    
  );
}
