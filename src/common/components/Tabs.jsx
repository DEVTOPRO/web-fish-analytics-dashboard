import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
    '& .css-1aquho2-MuiTabs-indicator': {
      color: '#AB26A3',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
        // </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CustomTabView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    props.tabSearchHandler&&props.tabSearchHandler()
    setValue(newValue);
  };

  return (
    <div sx={{ width: '100%' }} className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={props.fullWidth&&"fullWidth"}
        style={{borderBottom:"1px solid #e5dddd"}}
      >
        {props.tabsList.map((tab, indx) => (
          <Tab label={tab.title} {...a11yProps(indx)} />
        ))}
      </Tabs>
      <div>
        {props.tabsList.map((tab, indx) => (
          <TabPanel value={value} index={indx}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
