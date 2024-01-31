import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ThreePOutlinedIcon from '@mui/icons-material/ThreePOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import { makeStyles } from '@mui/styles'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    '& .MuiPaper-root-MuiDrawer-paper':{
      background:"#f4f5f8"
    }
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const useStyles = makeStyles(theme => ({
root:{
'& .MuiPaper-root-MuiDrawer-paper ':{
backgroundColor:"#f4f5f8"
}
},
}))
export default function HomeDrawer(props) {
const classes=useStyles()
  const [onSelect,setOnSelect] = React.useState("overView");
  let routersObject=[
  {key:"overView",page:"OverView",path:'/homeOver-view/overViewPage',icon:<DashboardOutlinedIcon/>},
  {key:"user",page:"User Info",path:'/homeOver-view/userPage',icon:<GroupsOutlinedIcon/>},
  {key:"chat",page:'Chat',path:'/homeOver-view/chatPage',icon:<ThreePOutlinedIcon/>},
  {key:"job",page:"Job Schedule",path:"/",icon:<WorkHistoryOutlinedIcon/>},
  {key:"learn",page:"Traning Session",path:"/",icon:<WorkHistoryOutlinedIcon/>}
]

const pathHandler=(path,key)=>{
  setOnSelect(key)
props.Redirectpath(path)
  }
  return (
    <Box sx={{ display: 'flex' }} className={classes.root}>
      <Drawer variant="permanent" open={true} style={{background:"#f4f5f8"}} >  
      <Toolbar sx={{padding:"10px 0px"}}/>
        <List>
          {routersObject.map((data, index) => (
            <ListItem key={data.page} disablePadding sx={{ display: 'block', padding:"5px" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  // #ff8d32
                  boxShadow:onSelect==data.key?"inset 5px 0px 3px 0px #40364f":"none",
                  border:"1px solid #8c7eff",
                  borderRadius:"15px",
                 padding:"10px",
                 background:"#2b00ff12"
                }}
                onClick={()=>pathHandler(data.path,data.key)}
              >
                <ListItemIcon
                  sx={{
                    mr: true ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.page} sx={{ opacity: true ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding:"20px 30px" }}>
        <Outlet/>
      </Box>
    </Box>
  );
}
