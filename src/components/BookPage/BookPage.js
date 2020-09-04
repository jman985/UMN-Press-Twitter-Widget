import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Widget from '../Widget/Widget';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import PropTypes from 'prop-types';




class BookPage extends Component {

    componentDidMount () {
        console.log('book page mounted')
        this.props.dispatch({type: 'FETCH_TWEETS', payload: this.props.match.params.publication_id});
    }


    render() {
      return (
        <>
        
      <div className="content">
        <h1>Book Sample Page</h1>

        {this.props.selectTweetID.map( tweetID =>
        
        <TwitterTweetEmbed key = {tweetID.index} tweetId={tweetID.tweet_id}
          options={{width: 250}}/>

        )}

      </div>
    </>
      )
  }
}

  BookPage.propTypes = {
    classes: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    selectTweetID: state.selectTweetID,
    
    });

  export default withRouter(connect(mapStateToProps)(BookPage));
