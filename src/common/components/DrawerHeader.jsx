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
const drawerWidth = 240

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
}))

export default function DrawerMainPage (props) {
  const classes = useStyles()
  let paths = [
    '/',
    '/patientCardPage',
    '/patientOnBoradpage',
    '/registarationbForm',
    '/patientDashboard'
  ];
  const leftMenu = [{name:'My Policies',path: "/Dashboard"}, {name:'Profile',path: "/Dashboard/Profile"},{name:'Terms & Conditions',path:'/Dashboard/termsAndConditions',},{name:'Payment Methods',path:'/Dashboard/paymentMethods'},{}]
  const handleLeftMenu = (path,name) => {
    props.Redirectpath(path)
    setHighlightItem(name)
  }
  const [highlightItem,setHighlightItem]=useState("My Policies")
  return (
            <Box sx={{ display: 'flex',['& .MuiDrawer-paper']:{marginTop:"24px"} }}>
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
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {leftMenu.map(
              (menu, index) => (
                <div>
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11}  >
                <div
                  className={classes.menuListStyle}
                  key={index}
                  onClick={()=>handleLeftMenu(menu.path,menu.name)}
                >
                  <ListItem button>
                      <ListItemText
                        style={{ marginLeft: '4px' }}
                        primary={menu.name}
                      />
                    </ListItem>
                </div>
                </Grid>
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
      <Box component='main'>

        <Outlet />
      </Box>
    </Box>
  )
}
