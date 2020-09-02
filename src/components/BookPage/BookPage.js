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


  //       const script = document.createElement("script");
  // script.src = "https://platform.twitter.com/widgets.js";
  // script.async = true;

  // document.body.appendChild(script);
    }

    // scriptLoaded() {
    //   window.A.sort();
    // }


    render() {
      return (
        <>
        
      <div className="content">
        <h1>Book Sample Page</h1>

        <div >
        {/* <Widget/> */}
        </div>

        {this.props.selectTweetID.map( tweetID =>
        
        <TwitterTweetEmbed key = {tweetID.index} tweetId={tweetID}
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

  export default connect((mapStateToProps)(withRouter(BookPage)));
