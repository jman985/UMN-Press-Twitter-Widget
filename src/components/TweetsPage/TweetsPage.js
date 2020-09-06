import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';


class Publications extends Component {



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
  componentDidUpdate(prevProps) {
    if (prevProps.dbTweets !== this.props.dbTweets){
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

  handleRejection = (tweetId) => {
    this.props.dispatch({type:'REJECT_TWEET', payload: tweetId});
  }


  render() {
      
    // prevents TypeError from init reducer 'dbTweets'
    if (this.props.dbTweets.map === undefined) return null;


    if (this.state.tweetsArray === []) return null;
    let undecided = this.props.dbTweets.filter(function (filteredTweets) {
    return filteredTweets.approved === null;
    });

    // prevent the DOM from rendering until the dbTweets array has loaded
    if (this.props.dbTweets.map === undefined) return null;

    if (this.state.tweetsArray[0] === undefined) return null;

    // this portion filters all database tweets into an "undecided" array with only tweets
    // that have approved value of null
    // let undecided = this.props.dbTweets.filter(function (filteredTweets) {
    //   return filteredTweets.approved === null;
    // });


    return(
      <>
        {JSON.stringify(this.state.key1)}
        {JSON.stringify(this.state.key2)}
        {JSON.stringify(this.state.key3)}
        {/* {JSON.stringify(this.state.tweetsArray)} */}
        <div style={{display: "flex",flexWrap: "wrap",justifyContent:'space-between'}}>
          <div style={{width:'450px',height:'600px'}}>
            <TwitterTweetEmbed key = {this.state.key1} tweetId={this.state.tweetsArray[this.state.key1].tweet_id}/>
            <div style={{display: "flex", justifyContent: "space-around"}}>
              <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,true)}>Approve</button>
              <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,false)}>Reject</button>
            </div>         
          </div>
          <div style={{width:'450px',height:'600px'}}>
            <TwitterTweetEmbed key = {this.state.key2} tweetId={this.state.tweetsArray[this.state.key2].tweet_id}/>
            <div style={{display: "flex", justifyContent: "space-around"}}>
              <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,true)}>Approve</button>
              <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,false)}>Reject</button>
            </div>
          </div>
          <div style={{width:'450px',height:'600px'}}>
            <TwitterTweetEmbed key = {this.state.key3} tweetId={this.state.tweetsArray[this.state.key3].tweet_id}/>
            <div style={{display: "flex", justifyContent: "space-around"}}>
              <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,true)}>Approve</button>
              <button onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,false)}>Reject</button>
            </div>
          </div>
          {/* {this.state.tweetsArray.slice(0,6).map((tweet, index) => (
            <div key={index} style={{border: "solid"}}>
                <TwitterTweetEmbed key = {this.state.key} tweetId={tweet.tweet_id}
                options={{width:'2000px !important'}}/>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                  <p>Hey this is Box {tweet.tweet_id}</p>
                  <button onClick={()=>this.handleApprove(tweet.id)}>Approve</button>
                  <button onClick={()=>this.handleRejection(tweet.id)}>Reject</button>
                </div>
            </div>
          ))} */}
        </div>
      </>
    )
  } 

}


const mapStateToProps = state => ({
  errors: state.errors,
  publication: state.publication,
  dbTweets: state.dbTweets,
});


export default connect(mapStateToProps)(Publications);