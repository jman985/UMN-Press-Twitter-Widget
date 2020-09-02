import React, { Component } from 'react';
import {connect} from 'react-redux';
import { TwitterTweetEmbed } from 'react-twitter-embed';


class Publications extends Component {

  componentDidMount() {
    this.props.dispatch({type:'FETCH_DATABASE_TWEETS'});
  }

  render() {
    if (this.props.dbTweets.map === undefined) return null;
    return(
      <>
        <p>hello this is the tweets page</p>
        {this.props.dbTweets.map((tweet, index) => (
              <tr key={index}>
                  <TwitterTweetEmbed key = {index} tweetId={tweet.tweet_id}
                  options={{width: 250}}/>
                <td>{tweet.tweet_id}</td>
                <td>{tweet.publication_id}</td>
              </tr>
              )
            )}
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