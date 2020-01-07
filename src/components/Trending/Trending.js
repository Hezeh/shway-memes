// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
// import PeopleIcon from '@material-ui/icons/People';
// import { 
//     Switch,
//     Route,
//     Link,
//     useRouteMatch,
// } from 'react-router-dom';
// import People from './People/People'
// import Groups from './GroupsList/GroupsList'
// import Hashtags from './Hashtags/Hashtags'
// import Zoom from '@material-ui/core/Zoom';
// import Fab from '@material-ui/core/Fab';
// import EditIcon from '@material-ui/icons/Edit';

// function a11yProps(index) {
//   return {
//     id: `nav-tab-${index}`,
//     'aria-controls': `nav-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   fab: {
//     position: 'absolute',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
// }));

// export default function TrendingNavTabs() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   let match = useRouteMatch();

//   const transitionDuration = {
//     enter: theme.transitions.duration.enteringScreen,
//     exit: theme.transitions.duration.leavingScreen,
//   };


//   return (
//     <div className={classes.root}>
//       <Route 
//           path="/trending"
//           render={({ location }) => (
//             <React.Fragment>
//             <AppBar position="static" color="inherit">
//               <Tabs
//                 variant="fullWidth"
//                 value={value}
//                 onChange={handleChange}
//                 aria-label="nav tabs example"
//               >
//                 <Tab icon={<TrendingUpIcon />} label="Hashtags" to={`${match.url}`} {...a11yProps(0)} component={Link} />
//                 <Tab icon={<PeopleIcon />} label="Groups" to={`${match.url}/groups`} {...a11yProps(1)} component={Link}/>
//                 <Tab icon={<PersonPinIcon />} label="Meme lords" to={`${match.url}/people`} {...a11yProps(2)} component={Link}/>
//               </Tabs>
//               {/* <Zoom
//                 // key={fab.color}
//                 // in={value === index}
//                 timeout={transitionDuration}
//                 style={{
//                   transitionDelay: `${transitionDuration.exit}ms`,
//                 }}
//                 unmountOnExit
//               > */}
//                 <Fab aria-label="Edit" className={classes.fab} color="green">
//                   <EditIcon />
//                 </Fab>
//             {/* </Zoom> */}
//             </AppBar>
//             <Switch>
//               <Route path={`${match.url}/groups`}>
//                 <Groups />
//               </Route>
//               <Route path={`${match.url}/people`}>
//                 <People />
//               </Route>
//               <Route path={`${match.url}`}>
//                 <Hashtags />
//               </Route>
//             </Switch>
//             </React.Fragment>
//       )}
//       />
//     </div>
//   );
// }

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PeopleIcon from '@material-ui/icons/People';
import People from './People/People'
import Groups from './GroupsList/GroupsList'
import Hashtags from './Hashtags/Hashtags'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
      {/* {value === index && {children}} */}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
    position: 'relative',
    // minHeight: 500,
    // marginTop: '10px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

export default function FloatingActionButtonZoom() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab icon={<TrendingUpIcon />} label="Hashtags" {...a11yProps(0)} />
          <Tab icon={<PeopleIcon />} label="Groups" {...a11yProps(1)} />
          <Tab icon={<PersonPinIcon />} label="Meme Lords" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Hashtags />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Groups />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <People />
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </div>
  );
}
