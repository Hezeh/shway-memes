import React, {Fragment, useEffect, useState} from 'react';
import {groupMembers} from '../../../constants'
import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import { groupsURL } from '../../constants'
import axios from 'axios'
import {connect} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';
import {Redirect, Link} from 'react-router-dom'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import { GroupJoinButton } from '../common'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '10px',
    padding: '10px',
    backgroundColor: theme.palette.background.paper,
  },
  iconbutton: {
    margin: '50'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function MembersList(props) {
    const classes = useStyles()
    const [ isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([]);
    const [url] = useState(`${groupMembers}?id=${props.id}`);

    async function fetchData() {
        setIsLoading(true)
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${props.token}`,
        };
        axios
            .get(url)
            .then(response => {
            setIsLoading(false)
            setData(response.data.results)
            })
            .catch(err => {
            console.log(err)
            setIsLoading(false)
            })
    }

    console.log(data[0])

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading === true) {
        return (
          <Fragment>
            <Skeleton animation="wave" height={400}/>
          </Fragment>
        )
    }

    return (
        <div className={classes.root}>
            <Grid>
                <Grid item xs={12} md={12}>
                <div>
                <List className={classes.list}>
                {data.map(({ id, members}) => (
                    <React.Fragment key={id}>
                    <Link to={`/group/${id}`} className={classes.menuLink}>
                        <ListItem button>
                        <ListItemText primary="Change to members" />
                        </ListItem>
                    </Link>

                    </React.Fragment>
                ))}
                </List>
                </div>
                </Grid>
            </Grid>
    </div>
    )
}

const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
  
  export default connect(mapStateToProps)(MembersList)
  
