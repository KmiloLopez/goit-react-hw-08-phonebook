
// import * as React from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/operations';


import { Link as RouterLink } from 'react-router-dom';
const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} role={undefined} />
  ));


function NavBar() {

  const { isLoggedIn, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log('loggedout');
    dispatch(logout(token));
  };
  return (
    
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {isLoggedIn ? (
      
      <>
      <Button  component={LinkBehavior} to="/contacts"  color="inherit">
  Contacts
  </Button>
        
        <Button component={LinkBehavior} color="inherit"  to="/" onClick={onLogout}>
        Logout
  </Button>
      </>
        
       
        
      
    ) : (
      <>
     
     <Button  component={LinkBehavior} to="/register"  color="inherit">
  Register
  </Button>
  <Button  component={LinkBehavior} to="/login"  color="inherit">
  Login
  </Button>
  
      </>
    )}
      </Toolbar>
    </AppBar>
  </Box>
      
  );
}
export default NavBar;
