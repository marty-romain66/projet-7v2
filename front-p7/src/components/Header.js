import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { modalChange } from '../feature/modal.slice';
import {useDispatch, useSelector} from "react-redux";
import { Link} from 'react-router-dom';
import {auths} from "../feature/auth.slice";


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = ( headerTrue) => {
  const url = window.location.href;
  const  [header, setHeader] = useState(true);

  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    dispatch(modalChange("block"));
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout = () => {
    localStorage.removeItem("user");
    dispatch(auths(false));
    document.location.href="/"

  }



  return (
    <AppBar position="static" sx={{
      borderRadius: "10px",
    }}>
      <Container maxWidth="xl" sx={{
      }} >

        <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
        
         

    
          <PostAddIcon style={{cursor : "pointer"}}    onClick={handleCloseNavMenu}  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
         
           <Box className='flex-center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },  }}>
           
           <Button   onClick={handleCloseNavMenu} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            
            
            
           
            {url === 'http://localhost:3001/profil'? "" : 'Home'}
            
           </Button>
        
       </Box>
          
           <Link to={"/"} > <img className='logo' src="./icon2.svg"/></Link>
    
          <Box className='flex-center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              <Button className='btn-header' 
               
                onClick={handleCloseNavMenu} 
                sx={{ my: 2, color: 'white', display: 'block' }}

              >
                
                {url === window.location.origin+"/profil"? "" : 'Ecrire un post'}
                
              </Button>
           
          </Box>
        

          <Box  sx={{ flexGrow: 0,
          widh:"100px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={auth.auth.pseudo} src={auth.auth.profilePicture} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <Link style={{ textDecoration:"none", color:"black" }} to={{
    pathname: "/profil"}}>
                <MenuItem  onClick={handleCloseUserMenu}>
             <Typography textAlign="center">Profil </Typography>
                </MenuItem></Link>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography onClick={logout} textAlign="center">Déconnexion</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;