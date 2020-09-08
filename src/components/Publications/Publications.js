import React, { Component } from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InclusionToggle from "./InclusionToggle";
import PublicationTable from "../PublicationTable/PublicationTable";

class Publications extends Component {

  componentDidMount = () => {
      this.props.dispatch({type: 'FETCH_PUBLICATIONS'})
  }
  
  handleClick = () => {
      this.props.dispatch({type: 'FETCH_TWEETS', payload: this.props.publication, userId: this.props.user.id});
      this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    if (this.props.publication.map === undefined) return null;
    if (this.props.publication === []) return null;


    // this section checks for the most recent publiction "last_searched" time and slices it into a readable format
    let readableTime
    let lastSearchedAll
    if (this.props.publication.length > 0){
      lastSearchedAll =  this.props.publication.reduce((a, b) => (a.last_searched > b.last_searched ? a : b)).last_searched;
    }
    if (typeof lastSearchedAll === 'string'){
      readableTime = lastSearchedAll.slice(0,10) + ' ' + lastSearchedAll.slice(12, -5)
    }


    return(
      <>
        <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
          <Typography variant='h6'>
            Total Publications Uploaded: <Typography variant='body1' component="span">{this.props.publication.length}</Typography>
          </Typography>
          <Typography variant='h6'>
            Last Search Date: 
            <Typography variant='body1' component="span">
              {/* {JSON.stringify(this.props.publiction)} */}
              {' '}{readableTime}  
            </Typography>
          </Typography>
          <Typography variant='h6'>
            Searches Remaining: <Typography variant='body1' component="span">{this.props.user.rate_limit_remaining}</Typography>
          </Typography>
          <Typography variant='h6'>
            Unsearched Publications: <Typography variant='body1' component="span"></Typography>
          </Typography>
        </Paper>
        <button onClick={this.handleClick}>
            Search
        </button>
            <PublicationTable />

      </>
    )
  } 
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  publication: state.publication,
  user: state.user,
});

export default connect(mapStateToProps)(Publications);
