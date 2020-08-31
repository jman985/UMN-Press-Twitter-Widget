import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";



const Widget = () => {

  
      return fetch('/api/tweets',
    { method: 'GET',
      mode: 'no-cors'               }
  )
  .then( response => response.json() )
  .then( json => console.log(json) )
  .catch( error => console.error('error:', error) );
           
  
    }
  
export default connect()(Widget);

    // ReactDOM.render(
    //     <Widget />,
    //     document.getElementById('root')
    //   );