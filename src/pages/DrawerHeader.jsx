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
    height: '48px',
    ['@media (max-width:1020px)']: {
      display: 'none',
    },
  },
  menuListStyle: {
    backgroundColor: "#64afed9e",
    // "#b9e4f8",
    // '#6d55e48f',
    padding: '2px',
    color: '#083c74',
    borderRadius: '5px ',
    marginLeft: '5px',
    marginBottom: '8px',
    ['& .MuiListItemText-primary']:{
fontWeight:'600',
fontSize:'16px'
    },
    ['@media (max-width:1020px)']: {
      padding: '0px',
    },
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
}))

export default function DrawerMainPage (props) {
  const classes = useStyles()
  const leftMenu = [{name:'Daily analysis',path: "/home-preview"}, {name:'Detecion Repo',path: "/analyticsDetecionPage"},{name:'Clips Repos',path:'/videoClipsPage',},{name:'Data Prep Tool',path:'/'}]
  const [highlightItem,setHighlightItem]=useState("Daily analysis")
  const handleLeftMenu = (path,name) => {
    props.Redirectpath(path)
    setHighlightItem(name)
  }
  return (
            <Box sx={{ display: 'flex',['& .MuiDrawer-paper']:{marginTop:"20px"} }} className={classes.root}>
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
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11} sx={{padding:'0px'}} >
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
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                  <div
                    className={classes.vertical}
                    style={{
                      background:highlightItem==menu.name? '#014e91' : 'transparent',
                    }}
                  />
                </Grid>
              </Grid>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Box component='main' sx={{padding:'10px',width:"-webkit-fill-available"}}>
        <Outlet />
      </Box>
    </Box>
  )
}
