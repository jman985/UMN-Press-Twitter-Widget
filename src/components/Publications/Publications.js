
import React, { Component } from 'react';
import {connect} from 'react-redux';
import InclusionToggle from './InclusionToggle'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PublicationTable from '../PublicationTable/PublicationTable'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublicationTable2 from "../PublicationTable2/PublicationTable2";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { NavigateBeforeSharp } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';

class Publications extends Component {
  
  state = {
    searchLimit: 400,
    newTweets: 0
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_PUBLICATIONS'})
    this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'})
  }

  componentDidUpdate(prevProps){
    if (this.props.dbTweets.length !== prevProps.dbTweets.length){
      this.props.dispatch({type: 'ADD_NEW_TWEET_COUNT'})
    }
  }

  handleClick = () => {
    this.setState({
      newTweets: 0
    })
    console.log('this is the searchLimit', this.state.searchLimit)
    this.props.dispatch({
      type: 'FETCH_TWEETS', 
      payload: this.sortPublicationsForSearch(),
      userId: this.props.user.id, 
      limit: this.state.searchLimit
    });
  }


  // returns a sorted publication array based on the 'last_searched' timecodes
  sortPublicationsForSearch = () => {
    let included = this.props.publciation.filter(x => x.include === true)
    // filter publications with null 'last_searched' values into new array
    let nullOnly = included.filter(x => x.last_searched === null)
    // filter publications with timecode 'last_searched' values into new array
    let notNull = included.filter(x => x.last_searched !== null)
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
     
      let sqlDate = new Date(lastSearchedAll)
      let date = sqlDate.toLocaleDateString()
      let time = sqlDate.toLocaleTimeString()
      readableTime = date + ' at ' + time
    }
    return readableTime;
  }//end determineLastSearch

  determineRateLimit = ()=>{
  //checks to determine remaining searches in 15-min window
    if(this.props.user.rate_limit_refresh * 1000 < new Date().getTime() ){
      return this.props.user.rate_limit;
    }else{
      return this.props.user.rate_limit_remaining;
    }
  }//end determineRateLimit

  parseRefreshTime = () => {
    let sqlDate = new Date(this.props.user.rate_limit_refresh * 1000)
    let refreshTime = (sqlDate).toLocaleTimeString();
    return refreshTime;
  }//end parseRefreshTime
  
  handleLimitChange = (event) => {
    this.setState({searchLimit: event.target.value})
  }

  handleSearchTypeChange = (searchType) => {
    this.props.dispatch({type:'CHANGE_ALL_SEARCH_TYPES', payload: searchType})
  }


  render() {
    if (this.props.publication.map === undefined) return null;
    if (this.props.publication === []) return null;

    return(
      <>

        <Box className='topBox' display='flex' justifyContent='center'>
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
              Searches Remaining: <Typography variant='body1' component="span">{this.determineRateLimit()}</Typography>
            </Typography>
            {this.props.user.rate_limit_refresh * 1000 > new Date().getTime() ?
                <Typography variant='h6'>
                  Searches Refresh at: <Typography variant='body1' component="span">{this.parseRefreshTime()}</Typography>
                </Typography>
            : <p></p>}
          </Paper>
          {!this.props.loading.loading ? 
          <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3',dispaly:'flex',flexDirection:'column'}}>
            <Typography variant='h6'>Batch Publication Search</Typography>
            <TextField
              id="outlined-name"
              label="# of Searches to Run"
              defaultValue="400"
              onChange={this.handleLimitChange}
              margin="normal"
              variant="outlined"
            />
            <Button style={{display:'flex'}} variant="contained" color="primary" onClick={this.handleClick}>
              Search
            </Button>
          </Paper>
            : 
            <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3',dispaly:'flex',flexDirection:'column'}}>
              <Typography variant='h6'>Searching for Tweets</Typography>
              <Typography variant='h6'>Searching {this.props.loading.count} of {this.props.loading.limit} Publications</Typography>
              <Typography variant='h6'>Found {this.props.loading.newTweets} Tweets</Typography>
              <LinearProgress variant="determinate" value={(this.props.loading.count / this.props.loading.limit)*100} />
            </Paper>
            }
            <Paper style={{width:'30%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3',dispaly:'flex',flexDirection:'column'}}>
              <FormControl style={{width:'90%'}}>
              <InputLabel>Select to Change all Search Types</InputLabel>
                <Select
                  defaultValue={""}
                  onChange={(event)=>this.handleSearchTypeChange(event.target.value)}
                >
                  <MenuItem value="">
                    <em>Cancel</em>
                  </MenuItem>
                  <MenuItem value={'T'}>Title</MenuItem>
                  <MenuItem value={'TaA'}>Title AND Author</MenuItem>
                  <MenuItem value={'TaS'}>Title AND Subtitle</MenuItem>
                  <MenuItem value={'ToS'}>Title OR Subtitle</MenuItem>
                  <MenuItem value={'S'}>Subtitle</MenuItem>
                  <MenuItem value={'SaA'}>Subtitle AND Author</MenuItem>
                  <MenuItem value={'TaAoS'}>Title AND Author OR Subtitle</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Box>
        <PublicationTable2 key={this.props.publication}/>
      </>
    )
  } 
}


const mapStateToProps = state => ({
  errors: state.errors,
  publication: state.publication,
  user: state.user,
  loading: state.loading,
  dbTweets: state.dbTweets
});


export default connect(mapStateToProps)(Publications);