import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Widget from '../Widget/Widget';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';





class BookPage extends Component {

    componentDidMount () {
        console.log('book page mounted', window.location.href.replace('http://localhost:3000/#/books/',''));
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
        <TwitterTweetEmbed tweetId={'1298894391763861504'}
          options={{width: 250}}
          />
      </div>


    </>
    )}
  }

  export default connect()(withRouter(BookPage));
