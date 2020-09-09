import React, { Component } from 'react';
import {connect} from 'react-redux';
import InclusionToggle from './InclusionToggle'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PublicationTable from '../PublicationTable/PublicationTable'

class Publications extends Component {


  handleClick = () => {
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

  
  render() {
    if (this.props.publication.map === undefined) return null;
    if (this.props.publication === []) return null;

    return(
      <>
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
        </Paper>
        <button onClick={this.handleClick}>
            Search
        </button>
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