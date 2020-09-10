import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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

    componentDidMount(){
      this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
      this.props.dispatch({type: 'FETCH_PUBLICATIONS'});
    }

      // this is needed to get the database tweets into this.state.tweetsArray
    componentDidUpdate(prevProps) {
      if (prevProps.dbTweets !== this.props.dbTweets || prevProps.publication !== this.props.publication){
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
        if (lastSearched[0] !== undefined) {
          sqlDate = new Date(lastSearched[0].last_searched)
        }
        let date = sqlDate.toLocaleDateString()
        let time = sqlDate.toLocaleTimeString()
        let readableTime = date + ' at ' + time
        console.log('lastSearched is ', readableTime)

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
      }
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
        console.log('status changed:', event.target.value)
        // conditional to check value from select drop-down menu
        console.log('UNDECIDED IS:', this.state.undecidedTweets)
        console.log('APPROVED IS:', this.state.approvedTweets)

        if(status === "UNDECIDED"){
            console.log('got undecided')

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
            console.log('got approved')

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
            console.log('got rejected')

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
    }
    

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
          {/* {JSON.stringify(this.state.tweetsArray)} */}

          <h1 style={{margin:'20px'}}>{this.props.publication[index].title}, {this.props.publication[index].author1} </h1>
          <div className="content" style={{display:'flex',margin:'20px'}}>
          
            <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
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
            
            
            <Paper style={{maxWidth:'40%',margin:'20px',padding:'10px',backgroundColor:'#f3f3f3'}}>
              <Typography variant='h6'>
                Last Search Date: 
                <Typography variant='body1' component="span">
                  {' '}{this.state.lastSearchedTime}
                </Typography>
              </Typography>
              <Typography variant='h6'>
                Searches Remaining: <Typography variant='body1' component="span">{this.props.user.rate_limit_remaining}</Typography>
              </Typography>
              <InclusionToggle publicationId={this.props.match.params.id} include={this.props.publication[index].include}/>
            </Paper>
          </div>
            


          <button>Prev</button>
          <button>Next</button>

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
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,false)}>Reject</Button>
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
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,false)}>Reject</Button>
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
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,false)}>Reject</Button>
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
