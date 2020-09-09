import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
// import './mobile.css'
// import './plone5fixes.css'
// import './style.css'


const BookPageMock = () => {

    function makeReact() {
    const ReactDOMServer = require('react-dom/server');
    const HtmlToReactParser = require('html-to-react').Parser;
     
    const htmlInput = '<div><h1>Title</h1><p>A paragraph</p></div>';
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(htmlInput);
    const reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);
     
    // assert.equal(reactHtml, htmlInput); // true

    // let bookContainer = document.getElementById('book');
                    // console.log(bookContainer);

                    // let bookDiv = document.createElement('div');
                    // console.log(reactHtml);

                    // bookDiv.innerHTML = reactHtml;
                    // console.log(bookDiv);
                    // console.log(bookContainer);

                    // // bookContainer.append(bookDiv);

    }
makeReact();

      return (
        <div id="book"></div>
      );
    
  };

  export default connect()(BookPageMock);
