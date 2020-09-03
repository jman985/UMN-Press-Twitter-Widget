import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';


class Publications extends Component {

  componentDidMount() {
    this.props.dispatch({type:'FETCH_DATABASE_TWEETS'});
  }

  handleApprove = (tweetId) => {
    this.props.dispatch({type:'APPROVE_TWEET', payload: tweetId})
  }

  handleRejection = (tweetId) => {
    this.props.dispatch({type:'REJECT_TWEET', payload: tweetId})
  }

  render() {
    // prevent the DOM from rendering until the dbTweets array has loaded
    if (this.props.dbTweets.map === undefined) return null;
    
    // this portion filters all database tweets into an "undecided" array with only tweets
    // that have approved value of null
    let undecided = this.props.dbTweets.filter(function (filteredTweets) {
      return filteredTweets.approved === null;
    });

    return(
      <>
        <p>hello this is the tweets page</p>
        <div class='box' style={{display: "flex",flexWrap: "wrap"}}>
          {undecided.slice(0, 6).map((tweet, index) => (
            <div style={{border: "solid"}}>
              <tr key={index}>
                <TwitterTweetEmbed key = {index} tweetId={tweet.tweet_id}
                options={{width: 250}}/>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                  <button onClick={()=>this.handleApprove(tweet.id)}>Approve</button>
                  <button onClick={()=>this.handleRejection(tweet.id)}>Reject</button>
                </div>
                {/* <td>{tweet.tweet_id}</td>
                <td>{tweet.publication_id}</td> */}
              </tr>
            </div>
          ))}
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