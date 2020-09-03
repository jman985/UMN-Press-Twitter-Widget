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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import './BookPage.css'

const styles = theme => ({
  Tweets: {
    textAlign: 'center', 
    paddingLeft: '80%',
  },
  Book:{
    textAlign: 'center', 

  },
  BoxContainer:{
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 5,
    style: { width: '615px', height: '615px' },
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    <Box className={classes.BoxContainer}>

      <div className="content">
        <div className ={classes.Book}>
        <img src = "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/University_of_Minnesota_Press_logo.svg/200px-University_of_Minnesota_Press_logo.svg.png"/>
        <h1>{this.props.bookData.title}: {this.props.bookData.subtitle}</h1>

        <img src={'https://www.upress.umn.edu/book-division/books/'+this.props.bookData.urlTitle+'/image_mini'} 
        
        alt={this.props.bookData.title}/>
        <h4> by {this.props.bookData.author1}</h4>
        </div>

      
      <AppBar position="static">
        <Tabs  aria-label="simple tabs example">
          <Tab label="Item One"  />
          <Tab label="Item Two"  />
          <Tab label="Item Three"  />
        </Tabs>
      </AppBar>
      <Box p={3}>
          <Typography>q</Typography>
        </Box>
      <Box p={3}>
          <Typography>a</Typography>
        </Box>
      <Box p={3}>
          <Typography>a</Typography>
        </Box>
      <div className={classes.Tweets}>
        <Grid
        container
        spacing={11}
        direction="column"
        justify="right"
        alignItems="flex-start">


        {this.props.selectTweetID.map( tweetID =>
        
        <TwitterTweetEmbed key = {tweetID.index} tweetId={tweetID.tweet_id}
          options={{width: 500, height:550}}/>

        )}

    <Widget/>

        </Grid>
        </div>
      </div>
      </Box>
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
