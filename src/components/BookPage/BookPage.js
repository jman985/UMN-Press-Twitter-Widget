import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import Widget from '../Widget/Widget';



class BookPage extends Component {

    componentDidMount () {
        console.log('book page mounted', window.location.href.replace('http://localhost:3000/#/books/',''));
        
    }
  
    render() {
      return (
        
        <div className="content">
        <h1>Book Sample Page</h1>
        <div >
        <Widget/>

        <ul id="viewTweets">

        </ul>
        </div>

      </div>



    )}
  }

  export default connect()(withRouter(BookPage));
