import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import Context from '../../context/Context';
import { useForm } from 'react-hook-form';
import FishIcon from "../../assets/fishjum.svg"
import PersonPinCircleTwoToneIcon from '@mui/icons-material/PersonPinCircleTwoTone';
const useStyles = makeStyles((theme) => ({
  loginIcon: {
    width: 'fit-content',
    display: 'flex',
    padding: '10px 18px 7px 18px',
    backgroundImage: 'linear-gradient(90deg, #AB26A3 3.67%, #3147BA 114%)',
    borderRadius: '32px',
    cursor: 'pointer',
  },
  signinIcon: {
    width: 'fit-content',
    display: 'flex',
    padding: '10px 18px 7px 18px',
    border: '1px solid purple',
    // backgroundImage: "linear-gradient(90deg, #AB26A3 3.67%, #3147BA 114%)",
    borderRadius: '32px',
    cursor: 'pointer',
  },
  logoutIcon: {
    borderColor: ' #8f288b',
    borderWidth: '2px',
    borderStyle: 'solid',
    width: '40px',

    borderRadius: '35px',
  },
  num: {
    position: 'absolute',
    right: '4px',
    top: '0px',
    color: '#f3f2f2',
  },
  notif: {
    height: '17px',
    width: '17px',
    backgroundColor: '#c18007',
    borderRadius: '50%',
    position: 'absolute',
    top: '20px',
  },
  buttonName: {
    color: '#fff',
  },
  menuStyle: {
    color: '#fff',
    cursor: 'pointer',
    padding: '10px',
    transition: 'transform .2s',
    '&:hover': {
      transform: 'scale(0.8)',
      color: '#AB26A3',
    },
    '&:active': {
      color: 'red',
      boxShadow: 'inset 1px 0px 3px 4px #948bb94d',
      transform: 'scale(0.6)',
      borderRadius: '7px',
    },
  },
  // headerIcon:{width: ' 23%', paddingTop: '1%', paddingBottom: ' 6px',cursor:"pointer" }
}));

const ResponsiveAppBar = (props) => {
  const classes = useStyles();
  const context = useContext(Context);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [token, setToken] = React.useState(true);
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  let agentId=localStorage.getItem("agentId");
  let customerId=localStorage.getItem("custId");
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/AboutUs' },
    !((customerId==undefined || customerId==null )&&(agentId==undefined||agentId==null)) ? { name: 'Policies', path: agentId ? '/agentProductPage' : '/productPage' }: '',

    !((customerId==undefined || customerId==null )&&(agentId==undefined||agentId==null)) ? { name: 'Dashboard', path: agentId?'/AgentDashboard/DashBoardTable':'/Dashboard' }:'',
  ];
  const [language, setLanguage] = React.useState(
    sessionStorage.getItem('Localisation'),
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    props.Redirectpath(path);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
   
  const logoutHandler = () => {
    props.Redirectpath('/');
  };
  const loginHandler = () => {
    // setToken(pre=>!pre);
    props.Redirectpath('/signIn');
  };
  const CustomerLoginHandler = () => {
    props.Redirectpath('/signIn');
  };
  const AgentLoginHandler = () => {
    props.Redirectpath('/AgentSignIn');
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage:"linear-gradient(90deg, #89edffcc 3.67%, #3147BA 114%)",
        color: 'red',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="auto">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            onClick={() => handleCloseNavMenu('/')}          >
            <img src={FishIcon} width={"45%"}/>
          </Typography>
          <Box
            sx={{
              flexGrow: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '17px',
            }}
          >
            {pages.map((page, index) => ( 
              page != '' ?              
              <div
                key={index}
                onClick={() => handleCloseNavMenu(page?.path)}
                className={classes.menuStyle}
              >
                {page?.name}
              </div>
              : ''
              
            ))}
          </Box>       
            <Box>
              <Tooltip title="Use Info">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,border:"1px solid #d6daff" }}>
                 <PersonPinCircleTwoToneIcon sx={{fontSize:"2.5rem",color:"#d6daff"}}/>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logoutHandler}>
                    {'Logout'}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
