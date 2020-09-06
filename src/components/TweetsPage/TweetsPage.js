import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import "./TweetsPage.css";


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


class TweetsPage extends Component {

  state = {
    tweetsArray: [],
    key1: 0,
    key2: 1,
    key3: 2,
  }

  componentDidMount() {
    this.props.dispatch({type:'FETCH_DATABASE_TWEETS'});

  }

  // this is needed to get the database tweets into this.state.tweetsArray
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dbTweets !== this.props.dbTweets){
      // this portion filters all database tweets into an "undecided" array with only tweets
      // that have approved value of null
      let undecided = this.props.dbTweets.filter(function (filteredTweets) {
      return filteredTweets.approved === null});
      this.setState({tweetsArray: undecided});
    }
  }


  handleApprove = (tweetId, slot, approved) => {
    // send the approve/reject based on which button was pressed
    if (approved){
      this.props.dispatch({type:'APPROVE_TWEET', payload: tweetId});
    } else {
      this.props.dispatch({type:'REJECT_TWEET', payload: tweetId});
    }

    // check to see which slot was changed and update the corresponding key with the next index in the array of tweets
    if (slot === 0){
      this.setState({ key1: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
    } else if (slot === 1){
      this.setState({ key2: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
    } else if (slot === 2){
      this.setState({ key3: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
    }
    ;
  }


  render() {
    const { classes } = this.props;
    // prevents TypeError from init reducer 'dbTweets'
    if (this.props.dbTweets.map === undefined) return null;

    if (this.state.tweetsArray === []) return null;

    // prevent the DOM from rendering until the dbTweets array has loaded
    if (this.props.dbTweets.map === undefined) return null;

    if (this.state.tweetsArray[0] === undefined) return null;



 

    return(
      <>
        {JSON.stringify(this.state.key1)}
        {JSON.stringify(this.state.key2)}
        {JSON.stringify(this.state.key3)}
        {/* {JSON.stringify(this.state.tweetsArray)} */}
        <GridList className={classes.root} style={{display: "flex",flexWrap: "wrap",justifyContent:'space-between'}}>
          <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
            <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="h2">
                  {JSON.stringify(this.state.title1)}
                  
                </Typography>
                <div style={{maxHeight:"500px", overflow:"auto"}}>
                  <TwitterTweetEmbed key={this.state.key1} tweetId={this.state.tweetsArray[this.state.key1].tweet_id}/>      
                </div>
              </CardActionArea>
              <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,true)}>Approve</Button>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,false)}>Reject</Button>
              </CardActions>
            </CardContent>   
          </Card>
          <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px'}}>
            <CardContent>
              <TwitterTweetEmbed key = {this.state.key2} tweetId={this.state.tweetsArray[this.state.key2].tweet_id}/>
              <CardActions style={{display: "flex", justifyContent: "space-around"}}>
                <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,true)}>Approve</button>
                <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,false)}>Reject</button>
              </CardActions>
            </CardContent>
          </Card>
          <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px'}}> 
            <CardContent>
              <CardActionArea>
              <TwitterTweetEmbed key = {this.state.key3} tweetId={this.state.tweetsArray[this.state.key3].tweet_id}/>
              </CardActionArea>
              <CardActions style={{display: "flex", height: "100%", justifyContent: "space-around"}}>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,true)}>Approve</Button>
                <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,false)}>Reject</Button>
              </CardActions>
            </CardContent>
          </Card>
        </GridList>
      </>
    )
  } 

}


TweetsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  publication: state.publication,
  dbTweets: state.dbTweets,
});


export default connect(mapStateToProps)(withStyles(styles)(TweetsPage));