import React, { Component } from 'react';
import {connect} from 'react-redux';
import InclusionToggle from './InclusionToggle'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PublicationTable from '../PublicationTable/PublicationTable'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Publications extends Component {
  
  state = {
    searchLimit: 400
  }

  handleClick = () => {
    this.props.dispatch({
      type: 'FETCH_TWEETS', 
      payload: this.sortPublicationsForSearch(),
      userId: this.props.user.id, 
      limit: this.state.searchLimit
    });
  }


  // returns a sorted publication array based on the 'last_searched' timecodes
  sortPublicationsForSearch = () => {
    // filter publications with null 'last_searched' values into new array
    let nullOnly = this.props.publication.filter(x => x.last_searched === null)
    // filter publications with timecode 'last_searched' values into new array
    let notNull = this.props.publication.filter(x => x.last_searched !== null)
    let sortedArray = notNull

    // sort the array with last_searched timecodes in ascending order
    sortedArray.sort((a, b) => parseFloat(((new Date(a.last_searched)).getTime())) - parseFloat(((new Date(b.last_searched)).getTime())));
    // append the array with timecodes to the end of the array with null last_searched values
    // so that publications that have never been searched before are checked first
    sortedArray = nullOnly.concat(sortedArray)

    return sortedArray;
  }//end sortPublicationsForSearch


  determineLastSearch = () => {
    // this section checks for the most recent publication "last_searched" time and puts into readable format
    let readableTime = '';
    let lastSearchedAll;

    if (this.props.publication.length !== 0 && this.props.publication !== undefined){
      let notNull = this.props.publication.filter(x => x.last_searched !== null)
      if (notNull.length > 0){
        lastSearchedAll =  notNull.reduce((a, b) => (a.last_searched > b.last_searched ? a : b)).last_searched;
      }
    }
    if (typeof lastSearchedAll === 'string'){
      // readableTime = lastSearchedAll.slice(0,10) + ' ' + lastSearchedAll.slice(11, -5)
      // readableTime = new Date(lastSearchedAll)
      let sqlDate = new Date(lastSearchedAll)
      let date = sqlDate.toLocaleDateString()
      let time = sqlDate.toLocaleTimeString()
      readableTime = date + ' at ' + time
    }
    return readableTime;
  }//end determineLastSearch

  parseRefreshTime = () => {
    let sqlDate = new Date(this.props.user.rate_limit_refresh * 1000) 
    let time = (sqlDate).toLocaleTimeString();
    return time;
  }//end parseRefreshTime
  
  handleLimitChange = (event) => {
      this.setState({searchLimit: event.target.value})
  }

  render() {
    if (this.props.publication.map === undefined) return null;
    if (this.props.publication === []) return null;

    return(
      <>
        {JSON.stringify(this.sortPublicationsForSearch())}
        <div class='topBox' style={{display:'flex'}}>
          <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
            <Typography variant='h6'>
              Total Publications Uploaded: <Typography variant='body1' component="span">{this.props.publication.length}</Typography>
            </Typography>
            <Typography variant='h6'>
              Last Search Date: 
              <Typography variant='body1' component="span">
                {' '}{this.determineLastSearch()}
              </Typography>
            </Typography>
            <Typography variant='h6'>
              Searches Remaining: <Typography variant='body1' component="span">{this.props.user.rate_limit_remaining}</Typography>
            </Typography>
            <Typography variant='h6'>
              Searches Refresh at: <Typography variant='body1' component="span">{this.parseRefreshTime()}</Typography>
            </Typography>
          </Paper>
          <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3',dispaly:'flex',flexDirection:'column'}}>
            <TextField
              id="outlined-name"
              label="# of Searches"
              value={this.state.searchAmount}
              onChange={this.handleLimitChange}
              margin="normal"
              variant="outlined"
            />
            <Button style={{display:'flex'}} variant="contained" color="primary" onClick={this.handleClick}>
              Search
            </Button>
          </Paper>
          </div>
        <PublicationTable />
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  publication: state.publication,
  user: state.user,
});


export default connect(mapStateToProps)(Publications);