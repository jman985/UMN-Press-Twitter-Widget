import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Widget from '../Widget/Widget';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import PropTypes from 'prop-types';
import { Box, Grid, Slide, Paper, Typography} from '@material-ui/core';
import { withStyles, mergeClasses } from '@material-ui/styles';


const styles = theme => ({
  Tweets: {
    textAlign: 'center', 
    paddingLeft: '80%',
  },
  Book:{
    textAlign: 'center', 

  }
    })


class BookPage extends Component {


    componentDidMount () {
        console.log('book page mounted')
        this.props.dispatch({type: 'FETCH_TWEETS', payload: this.props.match.params.publication_id});
        this.props.dispatch({type: 'FETCH_BOOK_DATA', payload: this.props.match.params.publication_id});

    //       const script = document.createElement("script");
    // script.src = "https://platform.twitter.com/widgets.js";
    // script.async = true;

    // document.body.appendChild(script);
    }

    // scriptLoaded() {
    //   window.A.sort();
    // }
    
     render() {
      const {classes} = this.props;

      return (
        <>
        
      <div className="content">
        <div className ={classes.Book}>
        <h1>{this.props.bookData.title}: {this.props.bookData.subtitle}</h1>
        <img src={'https://www.upress.umn.edu/book-division/books/'+this.props.bookData.urlTitle+'/image_mini'} 
        
        alt={this.props.bookData.title}/>
        <h4> by {this.props.bookData.author1}</h4>
        </div>
      <div>
        {/* <Widget/> */}
      </div>
      <div className={classes.Tweets}>
        <Grid
        container
        spacing={11}
        direction="column"
        justify="right"
        alignItems="flex-start">
        {this.props.selectTweetID.map( tweetID =>
        
        <TwitterTweetEmbed key = {tweetID.index} tweetId={tweetID.tweet_id}
          options={{width: 500, height: 400}}/>

        )}
        </Grid>
      </div>
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
    bookData: state.bookData
    });

  export default withStyles(styles)(withRouter(connect(mapStateToProps)(BookPage)));
