import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';
import InclusionToggle from './InclusionToggle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
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
        tweetsLoaded: false

    }

    componentDidMount(){
      this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
      this.props.dispatch({type: 'FETCH_PUBLICATIONS'});
      this.filterTweets();
    }

     
    componentDidUpdate(prevProps) {
      if ((prevProps.dbTweets !== this.props.dbTweets && this.state.tweetsLoaded === false )|| prevProps.publication !== this.props.publication){
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
    }


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
      this.props.dispatch({type:'FETCH_DATABASE_TWEETS'})
    }

    
    handleSelect = (event) => {
      let pubId = Number(this.props.match.params.id);
      let allTweets = this.props.dbTweets
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
              })

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
      })
    }// end handleSelect

    
  handleSearchTypeChange = (bookId, searchType) => {
    this.props.dispatch({type: 'CHANGE_SEARCH_TYPE', payload: {id: bookId, searchType: searchType}})
  }


  // checks the search type of each book so the select menus can reflect their current value
  getSearchType = () => {
    let pubId = this.props.match.params.id;
    let book = this.props.publication.filter(function (book) {
      return book.id === Number(pubId)})
    return book[0].search_type
  }
    
    seekPages = (input) => {
        // event.preventDefault();
        if (input === 'next'){
            this.setState({
                key1: this.state.key1 + 3,
                key2: this.state.key2 + 3,
                key3: this.state.key3 + 3,
            })
        } else if (input === 'prev'){
            this.setState({
                key1: this.state.key1 - 3,
                key2: this.state.key2 - 3,
                key3: this.state.key3 - 3,
            })
    
        }
        console.log('slots:', this.state);
    }

    determineRateLimit = ()=>{
      //checks to determine remaining searches in 15-min window
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
      

      return (
        <>
          {/* {JSON.stringify(this.state.key1)} */}
          <Typography variant='h4' style={{margin:'20px'}}>
              <span style={{textDecorationLine:'underline'}}>{this.props.publication[index].title}</span>
              <span> by {this.props.publication[index].author1}</span>
          </Typography>

          <Box display="flex" justifyContent="center" style={{margin:'20px'}}>
          
            <Paper style={{minWidth:'30%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
              <Typography variant='h6'>
                Total Tweets: 
                <Typography variant='body1' component="span">
                  {' '}{this.state.allTweetCount}
                </Typography>
              </Typography>
              <Typography variant='h6'>
                Approved Tweets: 
                <Typography variant='body1' component="span">
                  {' '}{this.state.approvedTweetCount}
                </Typography>
              </Typography>
              <Typography variant='h6'>
                Rejected Tweets: 
                <Typography variant='body1' component="span">
                  {' '}{this.state.rejectedTweetCount}
                </Typography>
              </Typography>
              <Typography variant='h6'>
                Undecided Tweets: 
                <Typography variant='body1' component="span">
                  {' '}{this.state.undecidedTweetCount}
                </Typography>
              </Typography>
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
                <FormHelperText>Select Tweet Category</FormHelperText>
              </FormControl>
            </Paper>
            
            
            <Paper style={{minWidth:'30%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
              <Typography variant='h6'>
                Last Search Date: 
                <Typography variant='body1' component="span">
                  {' '}{this.state.lastSearchedTime}
                </Typography>
              </Typography>
              <Typography variant='h6'>
                Searches Remaining: <Typography variant='body1' component="span">{this.determineRateLimit()}</Typography>
              </Typography>
              <Typography variant='h6'>
                Include in Batch Searches: <InclusionToggle publicationId={this.props.match.params.id} include={this.props.publication[index].include}/>
              </Typography>
              <Typography variant='h6'>Search by:
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
              </Typography>      
              <Button style={{display:'flex'}} variant="contained" color="primary" onClick={this.searchTweets}>
                Search
              </Button>
            </Paper>
            <Box display='flex' alignItems='center'>
              <Button variant="contained" color="primary" href={'http://localhost:3000/#/books/'+this.props.match.params.id} target="_blank">
                View Book Page &nbsp;<PlayArrowIcon/>
              </Button >
            </Box>
          </Box>

          <div>
            <button onClick={()=>this.seekPages('next')}>Next</button>
            {this.state.key1 === Number(0) ? '' : <button onClick={()=>this.seekPages('prev')}>Prev</button>}
          </div>

          <div className={classes.root} style={{display: "flex",flexWrap: "wrap",justifyContent:'center'}}>
            <div key={this.state.status+1} style={{display:'flex'}}>
            {this.state.tweetsArray[this.state.key1] ?
              <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
                <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <CardActionArea onClick={()=>{this.props.history.push(`publications/${this.state.tweetsArray[this.state.key1].publication_id}`)}}>
                    <Typography gutterBottom variant="h6">
                      Title: {this.state.tweetsArray[this.state.key1].title} <br />
                      Author: {this.state.tweetsArray[this.state.key1].author1}
                    </Typography>
                  </CardActionArea>
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
                  <CardActionArea onClick={()=>{this.props.history.push(`publications/${this.state.tweetsArray[this.state.key2].publication_id}`)}}>
                    <Typography gutterBottom variant="h6">
                      Title: {this.state.tweetsArray[this.state.key2].title} <br />
                      Author: {this.state.tweetsArray[this.state.key2].author1}
                    </Typography>
                  </CardActionArea>
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
                  <CardActionArea onClick={()=>{this.props.history.push(`publications/${this.state.tweetsArray[this.state.key3].publication_id}`)}}>
                    <Typography gutterBottom variant="h6">
                      Title: {this.state.tweetsArray[this.state.key3].title} <br />
                      Author: {this.state.tweetsArray[this.state.key3].author1}
                    </Typography>
                  </CardActionArea>
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
