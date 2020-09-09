import React, { Component } from 'react';
import {connect} from 'react-redux';
import InclusionToggle from './InclusionToggle'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PublicationTable from '../PublicationTable/PublicationTable'
import TextField from '@material-ui/core/TextField';

class Publications extends Component {


  handleClick = (limit) => {
      this.props.dispatch({type: 'FETCH_TWEETS', payload: this.props.publication, userId: this.props.user.id});
  }


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
  
  render() {
    if (this.props.publication.map === undefined) return null;
    if (this.props.publication === []) return null;

    return(
      <>
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
          <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
            <TextField
              id="outlined-name"
              label="Search Amount"
              // value={this.state.name}
              // onChange={}
              margin="normal"
              variant="outlined"
            />
            <button onClick={this.handleClick}>
              Search
            </button>
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