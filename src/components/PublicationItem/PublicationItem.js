import React, { Component } from "react";
import { connect } from "react-redux";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';
import InclusionToggle from './InclusionToggle'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Box from '@material-ui/core/Box';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  card: {
    minWidth: 275,
    margin: '15px'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title: {
    fontSize: 14,
  },
});


class PublicationItem extends Component {

  state = {
      status: 'UNDECIDED',
      tweetsArray: [1,2,3],
      lastSearchedTime: 0,
      allTweetCount: 0,
      undecidedTweetCount: 0,
      approvedTweetCount: 0,
      rejectedTweetCount: 0,
      key1: 0,
      key2: 1,
      key3: 2,
  }

  // gets tweets and publication info from database when page is first loaded
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
    this.props.dispatch({type: 'FETCH_PUBLICATIONS'});
    this.filterTweets();
  }

    // checks for chagnes to 
  componentDidUpdate(prevProps) {
    if ((prevProps.dbTweets !== this.props.dbTweets) || prevProps.publication !== this.props.publication){
      this.filterTweets();
      this.setState({tweetsLoaded: true}); 

    }
  } 

  // filterTweets looks at all the tweets in the database and separates the ones
  // for this publication. It then counts how many are approved/rejected/undecided
  // and places the undecided ones in the state.tweetsArray for viewing on initial load.
  filterTweets = () => {
    let pubId = Number(this.props.match.params.id);
    let allTweets = this.props.dbTweets


    // sort tweets with same publication id from all tweets
    let relatedTweets = allTweets.filter(function (filteredTweets) {
      return Number(filteredTweets.publication_id) === pubId});

    // sort undecided tweets
    let relatedTweetsUndecided = relatedTweets.filter(function (filteredTweets) {
      return filteredTweets.approved === null});
    // sort approved tweets
    let relatedTweetsApproved = relatedTweets.filter(function (filteredTweets) {
      return filteredTweets.approved === true});
    // sort rejected tweets
    let relatedTweetsRejected = relatedTweets.filter(function (filteredTweets) {
      return filteredTweets.approved === false});

    // get the last_searched time from publications
    let lastSearched = this.props.publication.filter(function (book) {
      return book.id === pubId})

    let sqlDate = 0
    let readableTime = 0
    if (lastSearched[0] !== undefined) {
      sqlDate = new Date(lastSearched[0].last_searched)
      let date = sqlDate.toLocaleDateString()
      let time = sqlDate.toLocaleTimeString()
      readableTime = date + ' at ' + time
    }

      // get an inital count of all the tweet categories and set the undecided tweets to be the tweetsArray
    if (this.state.status === "UNDECIDED") {
      this.setState({
        tweetsArray: relatedTweetsUndecided,
        undecidedTweetCount: relatedTweetsUndecided.length,
        approvedTweetCount: relatedTweetsApproved.length,
        rejectedTweetCount: relatedTweetsRejected.length,
        allTweetCount: relatedTweetsUndecided.length + relatedTweetsApproved.length + relatedTweetsRejected.length,
        lastSearchedTime: readableTime
      });
    }
  }// end filter tweets

  // runs search for the currently viewed publication
  searchTweets = () => {
    //filter this publication from all of them
    let pubId = Number(this.props.match.params.id);
    let thisPublication = this.props.publication.filter(function (book) {
      return book.id === pubId})
    this.props.dispatch({
      type: 'FETCH_TWEETS', 
      payload: thisPublication,
      userId: this.props.user.id, 
      limit: 1
    });
    this.setState({
      key1: 0,
      key2: 1,
      key3: 2,
    })
  }

  // changes the approve value of a tweet when a user presses approve or reject
  handleApprove = (tweetId, slot, approved) => {
    // send the approve/reject based on which button was pressed
    if (approved){
      this.props.dispatch({type:'APPROVE_TWEET', payload: tweetId});
      if (this.state.status === "UNDECIDED") {
        this.setState({
          approvedTweetCount: this.state.approvedTweetCount + 1,
          undecidedTweetCount: this.state.undecidedTweetCount - 1
        })
      } else if (this.state.status === "REJECTED") {
        this.setState({
          approvedTweetCount: this.state.approvedTweetCount + 1,
          rejectedTweetCount: this.state.rejectedTweetCount - 1
        })
      }
    } else {
      this.props.dispatch({type:'REJECT_TWEET', payload: tweetId});
      if (this.state.status === "UNDECIDED") {
        this.setState({
          rejectedTweetCount: this.state.rejectedTweetCount + 1,
          undecidedTweetCount: this.state.undecidedTweetCount - 1
        })
      } else if (this.state.status === "APPROVED") {
        this.setState({
          rejectedTweetCount: this.state.rejectedTweetCount + 1,
          approvedTweetCount: this.state.approvedTweetCount - 1,
        })
      }
    }

    // check to see which slot was changed and update the corresponding key with the next index in the array of tweets
    if (slot === 0){
      this.setState({ key1: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
    } else if (slot === 1){
      this.setState({ key2: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
    } else if (slot === 2){
      this.setState({ key3: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
    }
  }

  // changes what category of tweets are visible depending on the selection from the drop-down menu
  handleSelect = (event) => {
    let pubId = Number(this.props.match.params.id);
    let allTweets = this.props.dbTweets;
      // assign select drop-down menu from DOM to variable 'status'
      const status = event.target.value;
      // conditional to check value from select drop-down menu
      if(status === "UNDECIDED"){
          let relatedTweets = allTweets.filter(function (filteredTweets) {
            return Number(filteredTweets.publication_id) === pubId});
          let relatedTweetsUndecided = relatedTweets.filter(function (filteredTweets) {
            return filteredTweets.approved === null});
            this.setState({
              tweetsArray: relatedTweetsUndecided,
              key1: 0,
              key2: 1,
              key3: 2,
            });
        } else if (status === "APPROVED") {
          let relatedTweets = allTweets.filter(function (filteredTweets) {
            return Number(filteredTweets.publication_id) === pubId});
          let relatedTweetsApproved = relatedTweets.filter(function (filteredTweets) {
            return filteredTweets.approved === true});
          this.setState({
            tweetsArray: relatedTweetsApproved,
            key1: 0,
            key2: 1,
            key3: 2,
          })
        } else if (status === "REJECTED") {
          let relatedTweets = allTweets.filter(function (filteredTweets) {
            return Number(filteredTweets.publication_id) === pubId});
          let relatedTweetsRejected = relatedTweets.filter(function (filteredTweets) {
            return filteredTweets.approved === false});
          this.setState({
            tweetsArray: relatedTweetsRejected,
            key1: 0,
            key2: 1,
            key3: 2,
          })
      } else {
          return null;    
      }
    this.setState({
      status: status
    });
    this.props.dispatch({type:'FETCH_DATABASE_TWEETS'});
  }// end handleSelect


  // changes the type of search depending on selection from the drop-down selector
  handleSearchTypeChange = (bookId, searchType) => {
    this.props.dispatch({type: 'CHANGE_SEARCH_TYPE', payload: {id: bookId, searchType: searchType}})
  }


  // checks the search type of each book so the select menus can reflect their current value
  getSearchType = () => {
    let pubId = this.props.match.params.id;
    let book = this.props.publication.filter(function (book) {
      return book.id === Number(pubId)});
    return book[0].search_type;
  }
    

  // Allows the users to view more tweets by clicking next/prev buttons
  seekPages = (input) => {
      // event.preventDefault();
      if (input === 'next'){
          this.setState({
              key1: this.state.key1 + 3,
              key2: this.state.key2 + 3,
              key3: this.state.key3 + 3,
          });
      } else if (input === 'prev'){
          this.setState({
              key1: this.state.key1 - 3,
              key2: this.state.key2 - 3,
              key3: this.state.key3 - 3,
          });
      }
  }


  //checks to determine remaining searches in 15-min window
  determineRateLimit = ()=>{
      if(this.props.user.rate_limit_refresh * 1000 < new Date().getTime() ){
        return this.props.user.rate_limit;
      }else{
        return this.props.user.rate_limit_remaining;
      }
    }//end determineRateLimit

  render() {
    const { classes } = this.props;
    // prevents init reducer from throwing TypeError when calling 'findIndex'
    if (this.props.publication.findIndex === undefined) return null;
    // Converts selected publication id to Number and assigns to variable 'id'
    const id = Number(this.props.match.params.id);
    // finds the index for selected Publication ('id') in publication reducer
    const index = this.props.publication.findIndex(i=>i.id === id);
    // prevents TypeError on load from referencing an index item of the init reducer
    if (this.props.publication[index] === undefined) return null;
      

  return(
    <>
      <Box display='flex' flexDirection='column' textAlign='center' justifyContent='center'>
        <Typography variant='h4' style={{marginTop:'20px'}}>
          <span style={{textDecorationLine:'underline'}}>{this.props.publication[index].title}</span>
        </Typography>
        <Typography variant='h6' style={{margin:'0px'}}>
          <span> by {this.props.publication[index].author1}</span>
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" style={{margin:'20px'}}>
      
        <Paper style={{width:'28%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
          <Typography variant='h6' style={{color:'#626262'}}>
            Last Searched: 
            <Typography variant='h6' component="span" style={{color:'#000'}}>
              {' '}{this.state.lastSearchedTime}
            </Typography>
          </Typography>
          <Box display='flex'>
            <Typography variant='h6' style={{color:'#626262', marginRight:'10px'}}>
              Include in Batch Searches:
            </Typography>
            <InclusionToggle publicationId={this.props.match.params.id} include={this.props.publication[index].include}/>
          </Box>
          <Box display='flex'>
            <Typography variant='h6' style={{marginRight:'10px', color:'#626262'}}>Search by:</Typography>  
            <FormControl className={classes.formControl}>
              <Select
                defaultValue={this.getSearchType}
                onChange={(event)=>this.handleSearchTypeChange(this.props.match.params.id, event.target.value)}
              >
                <MenuItem value={'T'}>Title</MenuItem>
                <MenuItem value={'TaA'}>Title AND Author</MenuItem>
                <MenuItem value={'TaS'}>Title AND Subtitle</MenuItem>
                <MenuItem value={'ToS'}>Title OR Subtitle</MenuItem>
                <MenuItem value={'S'}>Subtitle</MenuItem>
                <MenuItem value={'SaA'}>Subtitle AND Author</MenuItem>
                <MenuItem value={'TaAoS'}>Title AND Author OR Subtitle</MenuItem>
              </Select>
            </FormControl>      
          </Box>
          <Button style={{display:'flex',marginTop:'8px'}} variant="contained" color="primary" onClick={this.searchTweets}>
            Search
          </Button>
        </Paper>

        <Paper style={{width:'18%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
          <Box>
            <Typography variant='h6' style={{color:'#626262'}}>
              Total Tweets: 
              <Typography variant='h6' component="span" style={{color:'#000'}}>
                {' '}{this.state.allTweetCount}
              </Typography>
            </Typography>
            <Typography variant='h6' style={{color:'#626262'}}>
              Approved Tweets: 
              <Typography variant='h6' component="span" style={{color:'#000'}}>
                {' '}{this.state.approvedTweetCount}
              </Typography>
            </Typography>
            <Typography variant='h6' style={{color:'#626262'}}>
              Rejected Tweets: 
              <Typography variant='h6' component="span" style={{color:'#000'}}>
                {' '}{this.state.rejectedTweetCount}
              </Typography>
            </Typography>
            <Typography variant='h6' style={{color:'#626262'}}>
              Undecided Tweets: 
              <Typography variant='h6' component="span" style={{color:'#000'}}>
                {' '}{this.state.undecidedTweetCount}
              </Typography>
            </Typography>
          </Box>
        </Paper>


        <Paper style={{width:'28%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
            <Box style={{height:'100%'}} display="flex" flexDirection='column' justifyContent='space-around' alignItems='center'>
              <Box display='flex' flexDirection='row'>
                <Typography variant='h6' component="span" style={{marginRight:'10px', color:'#626262'}}>Viewing Category:{' '}</Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    onChange={this.handleSelect}
                    defaultValue='UNDECIDED'
                    id="status-select"
                  >
                    <MenuItem value='UNDECIDED'>Undecided</MenuItem>
                    <MenuItem value='APPROVED'>Approved</MenuItem>
                    <MenuItem value='REJECTED'>Rejected</MenuItem>
                    </Select>
                  </FormControl>
              </Box>
              <Box display='flex'>
              <Link to= {'/books/'+this.props.match.params.id} target="_blank">
                <Button variant="contained" color="primary" >
                  View Book Page &nbsp;<PlayArrowIcon/>
                </Button>
                </Link>
              </Box>
            </Box>
        </Paper>
        
        
        
      </Box>

      <Box display='flex' justifyContent='center'>
        {this.state.key1 === Number(0) ? '' : <Box style={{padding:'10px'}}><Button color="primary" variant="contained" onClick={()=>this.seekPages('prev')}>Prev</Button></Box>}
        {this.state.tweetsArray.length < 4 ? '' :
        <Box style={{padding:'10px'}}>
          <Button color="primary" variant="contained" onClick={()=>this.seekPages('next')}>Next</Button>
        </Box>}
      </Box>

      <div className={classes.root} style={{display: "flex",flexWrap: "wrap",justifyContent:'center'}}>
        <div key={this.state.status+1} style={{display:'flex'}}>
        {this.state.tweetsArray[this.state.key1] ?
          <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
            <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                <Typography gutterBottom variant="h6" style={{color:'#626262'}}>
                  Title: {this.state.tweetsArray[this.state.key1].title} <br />
                  Author: {this.state.tweetsArray[this.state.key1].author1}
                </Typography>
                <div style={{maxHeight:"500px", overflow:"auto"}}>
                  <TwitterTweetEmbed key={this.state.key1} tweetId={this.state.tweetsArray[this.state.key1].tweet_id}/>      
                </div>
              <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,true)}>Approve</Button>
                <Button variant="outlined" color="secondary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,false)}>Reject</Button>
              </CardActions>
            </CardContent>   
          </Card>
        : ''}
        </div>

        <div key={this.state.status+2} style={{display:'flex'}}>
        {this.state.tweetsArray[this.state.key2] ?
          <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
            <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                <Typography gutterBottom variant="h6" style={{color:'#626262'}}>
                  Title: {this.state.tweetsArray[this.state.key2].title} <br />
                  Author: {this.state.tweetsArray[this.state.key2].author1}
                </Typography>
                <div style={{maxHeight:"500px", overflow:"auto"}}>
                  <TwitterTweetEmbed key={this.state.key2} tweetId={this.state.tweetsArray[this.state.key2].tweet_id}/>      
                </div>
              <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,true)}>Approve</Button>
                <Button variant="outlined" color="secondary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,false)}>Reject</Button>
              </CardActions>
            </CardContent>   
          </Card>
        : ''}
        </div>

        <div key={this.state.status+3} style={{display:'flex'}}>
        {this.state.tweetsArray[this.state.key3] ?
          <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
            <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                <Typography gutterBottom variant="h6" style={{color:'#626262'}}>
                  Title: {this.state.tweetsArray[this.state.key3].title} <br />
                  Author: {this.state.tweetsArray[this.state.key3].author1}
                </Typography>
                <div style={{maxHeight:"500px", overflow:"auto"}}>
                  <TwitterTweetEmbed key={this.state.key3} tweetId={this.state.tweetsArray[this.state.key3].tweet_id}/>      
                </div>
              <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,true)}>Approve</Button>
                <Button variant="outlined" color="secondary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,false)}>Reject</Button>
              </CardActions>
            </CardContent>   
          </Card>
        : ''}
        </div>
      </div>
      </>
    )
  }
}

PublicationItem.propTypes = {
    classes: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
  errors: state.errors,
  publication: state.publication,
  dbTweets: state.dbTweets,
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(PublicationItem));
