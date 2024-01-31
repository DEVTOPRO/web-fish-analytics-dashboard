import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Grid } from '@mui/material';
import { Outlet, Link, useRoutes, useParams } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
 import Collapse from '@mui/material/Collapse';
 import CloudUploadIcon from '@mui/icons-material/CloudUpload';
 import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
 import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
 import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = "20%"

const useStyles = makeStyles(theme => ({
  vertical: {
    background: '#FB2929',
    borderRadius: '5px 0px 0px 5px',
    width: '8px',
    float: 'right',
    margin: '0px 0px 10px 0px',
    height: '60px',
    ['@media (max-width:1020px)']: {
      display: 'none',
    },
  },
  menuListStyle: {
    backgroundColor: '#F1EEEE',
    // margin: ' 14px',
    padding: '6px',
    color: '#3147BA',
    borderRadius: '5px ',
    marginLeft: '8px',
    marginBottom: '10px',
    ['@media (max-width:1020px)']: {
      // margin: '5px',
      padding: '0px',
    },
  },
  menuListWithSubList: {
    backgroundColor: '#F1EEEE',
    // margin: ' 14px',
    padding: '6px',
    color: '#3147BA',
    borderRadius: '5px ',
    marginLeft: '8px',
    marginBottom: '10px',
    display:"flex",
    ['@media (max-width:1020px)']: {
      // margin: '5px',
      padding: '0px',
    },
  },
  subListItem:{
    cursor:"pointer",
    paddingLeft:"30px",
    color:'#852f8e',
    background: "#eeeeee",
    borderRadius: "3px",
    padding: "5px 0px 5px 25px",
    marginLeft: "9px",
  }
}))

export default function DrawerMainPage (props) {
  const classes = useStyles()
const [open,setOpen]=useState(false);
const [highlightItem,setHighlightItem]=useState("My Policies")
  // const leftMenu = [{name:'My Policies',path: "/AgentDashboard"}, {name:'Profile',path: "/AgentDashboard/AgentProfile"},{name:'Terms & Conditions',path:'/Dashboard/termsAndConditions',},{name:'Payment Methods',path:'/Dashboard/paymentMethods',},]
  const leftMenu = [{name:'My Policies',path: "/AgentDashboard/DashBoardTable",subList:false}, {name:'Sales Reports',path: "/AgentDashboard/sales-report",subList:false},{name:'Corporate Uploads',path: [{subName:"Bulk Upload",subPath:"/AgentDashboard/bulkUpload"},{subName:"Bulk Upload History",subPath:"/AgentDashboard/bulkHistory"}],subList:true},]
  const handleLeftMenu = (path,name) => {
    props.Redirectpath(path)
    setHighlightItem(name)
  }
  const handleClick = () => {
    setOpen(!open);
  }; 
  return (
    <Box sx={{backgroundColor:"whitesmoke", width: '100%'}}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' ,marginTop:"6%"}}>
          <List>
            {leftMenu.map(
              (menu, index) => (
                <div>
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
              { !menu.subList? <Grid item xs={11} sm={11} md={11} lg={11} xl={11}  >
                <div
                  className={classes.menuListStyle}
                  key={index}
                  onClick={()=>handleLeftMenu(menu.path,menu.name)}
                >
                  <ListItem >
                      <ListItemText
                        style={{ marginLeft: '4px' }}
                        primary={menu.name}
                      />
                    </ListItem>
                </div>
                </Grid>:
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11}  >
        <div  className={classes.menuListWithSubList} onClick={handleClick}
                  key={index}
                  > 
                  <ListItem  >
                      <ListItemText
                        style={{ marginLeft: '4px' }}
                        primary={menu.name}
                      />
                    </ListItem>
              
       <div> {open ? (
          <ExpandLess style={{marginTop:'10px'}} />
        ) : (
          <ExpandMore  style={{marginTop:'10px'}}/>
        )}</div>
</div>
      <Collapse in={open}  >
        <List component="div" >
         {menu.path&&menu.path.length>0&&menu.path.map((pathData,index)=>(
       <ListItemText className={classes.subListItem} key={index} onClick={()=>handleLeftMenu(pathData.subPath,menu.name)} primary={pathData.subName} />
         ))}  
        </List>
      </Collapse> </Grid>}
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <div
                    className={classes.vertical}
                    style={{
                      background:
                        highlightItem==menu.name? 'linear-gradient(90deg, rgb(171, 38, 163) 3.67%, rgb(49, 71, 186) 114%)' : 'transparent',
                    }}
                  />
                </Grid>
              </Grid>
              </div>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box sx={{paddingLeft:'22%'}} >

        <Outlet />
      </Box>
    </Box>
  )
}
