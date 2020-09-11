import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/styles';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';

// import './mobile.css'
import './plone5fixes.css'
import './style.css'
import './viewsource.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 275,
    margin: '15px'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title: {
    fontSize: 14,
  },
});

class BookPageMock extends Component {

  componentDidMount () {
    console.log('mock book page mounted')

    this.props.dispatch({type: 'FETCH_TWEET_IDS', payload: this.props.match.params.publication_id});
    this.props.dispatch({type: 'FETCH_BOOK_DATA', payload: this.props.match.params.publication_id});

  }

  reverseAuthor = (name) =>{

    console.log(name);
    
    return name
  }
    
  render () {
    const { classes } = this.props;

    return(
      <>
      <TwitterTweetEmbed tweetId={1303449831998971904}
          options={{width: 220, height:550}}/>
      <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/++theme++ump.theme/_images/favicon.png" type="image/x-icon" />
        
        <title>Bring That Beat Back — University of Minnesota Press</title><meta name="DC.description" content=" 
How sampling remade hip-hop over forty years, from pioneering superstar Grandmaster Flash through crate-digging preservationist and innovator Madlib
 " /><meta name="description" content=" 
How sampling remade hip-hop over forty years, from pioneering superstar Grandmaster Flash through crate-digging preservationist and innovator Madlib
 " /><meta name="DC.format" content="text/plain" /><meta name="DC.type" content="Book" /><meta name="keywords" content="2020 Humanities and Arts catalog, 2020 Spring, 2020 Sociology catalog" /><meta name="DC.date.modified" content="2020-07-13T10:26:25-05:00" /><meta name="DC.subject" content="2020 Humanities and Arts catalog, 2020 Spring, 2020 Sociology catalog" /><meta name="DC.date.created" content="2019-11-04T12:48:11-05:00" /><meta name="DC.language" content="en" /><meta content="summary" name="twitter:card" /><meta content="University of Minnesota Press" property="og:site_name" /><meta content="Bring That Beat Back" property="og:title" /><meta content="website" property="og:type" /><meta content=" 
How sampling remade hip-hop over forty years, from pioneering superstar Grandmaster Flash through crate-digging preservationist and innovator Madlib
 " property="og:description" /><meta content={'https://www.upress.umn.edu/book-division/books/' + this.props.bookData.urlTitle} property="og:url" /><meta content="https://www.upress.umn.edu/logo.png" property="og:image" /><meta content="image/png" property="og:image:type" /><meta property="og:title" content={this.props.bookData.title} /><meta property="og:url" content={"https://www.upress.umn.edu/book-division/books/"+this.props.bookData.urlTitle} /><meta property="og:image" content="https://www.upress.umn.edu/book-division/books/bring-that-beat-back/image_large" /><meta property="og:site_name" content="University of Minnesota Press" /><meta property="og:description" content=" 
How sampling remade hip-hop over forty years, from pioneering superstar Grandmaster Flash through crate-digging preservationist and innovator Madlib
 " /><link rel="canonical" href={'https://www.upress.umn.edu/book-division/books/'+ this.props.bookData.urlTitle} /><link rel="shortcut icon" type="image/x-icon" href="https://www.upress.umn.edu/favicon.ico" /><link rel="apple-touch-icon" href="https://www.upress.umn.edu/touch_icon.png" /><link rel="search" href="https://www.upress.umn.edu/@@search" title="Search this site" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/++plone++production/++unique++2020-01-24T10:17:06.181013/default.css" data-bundle="production" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/++plone++static/++unique++2020-01-09%2023%3A33%3A20.258926/plone-compiled.css" data-bundle="plone" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/++plone++static/++unique++2020-01-10%2000%3A30%3A03.761631/plone-legacy-compiled.css" data-bundle="plone-legacy" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/collective.js.jqueryui.custom.min.css?version=None" data-bundle="jqueryui" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/++resource++jazkarta.shop/shop-compiled.css?version=None" data-bundle="jazkarta-shop" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/++plone++static/++unique++2020-01-10%2000%3A30%3A11.502939/faceted-jquery-compiled.css" data-bundle="faceted-jquery" /><link rel="stylesheet" type="text/css" href="https://www.upress.umn.edu/++plone++static/++unique++2020-01-10%2000%3A31%3A05.901358/faceted-view.min.css" data-bundle="faceted-view" /><meta name="generator" content="Plone - http://plone.com" />
        <div className="body_wrapper">
          <div className="wrapper">
            <div id="sidebar-wrapper">
              <div id="sidebar">
                <h1 id="logo"><a href="https://www.upress.umn.edu" title="University of Minnesota Press">University of Minnesota Press</a></h1>
                <div className="block_nav">
                  <div className="portletWrapper" id="portletwrapper-706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a636f6d696e672d736f6f6e" data-portlethash="706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a636f6d696e672d736f6f6e"><div className="portletStaticText portlet-static-coming-soon"><p><a href="https://www.upress.umn.edu/book-division/collections/forthcoming-from-ump" className="internal-link" id="forthcoming-titles">Coming soon</a></p></div>
                  </div>
                  <div className="portletWrapper" id="portletwrapper-706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a6e617669676174696f6e" data-portlethash="706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a6e617669676174696f6e">
                    <aside className="portlet portletNavigationTree" role="navigation">
                      <header className="portletHeader">
                        <a href="https://www.upress.umn.edu/disciplines" className="tile">Disciplines</a>
                      </header>
                      <nav className="portletContent lastItem">
                        <ul className="navTree navTreeLevel0">
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-american-studies">
                            <a href="https://www.upress.umn.edu/disciplines/american-studies" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              American Studies
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-anthropology">
                            <a href="https://www.upress.umn.edu/disciplines/anthropology" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Anthropology
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-architecture_and_design">
                            <a href="https://www.upress.umn.edu/disciplines/architecture_and_design" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Architecture and Design
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-art_performance">
                            <a href="https://www.upress.umn.edu/disciplines/art_performance" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Art and Performance
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-cultural_criticism">
                            <a href="https://www.upress.umn.edu/disciplines/cultural_criticism" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Cultural Criticism
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-economics_business">
                            <a href="https://www.upress.umn.edu/disciplines/economics_business" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Economics and Business
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-education_law">
                            <a href="https://www.upress.umn.edu/disciplines/education_law" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Education and Law
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-environment">
                            <a href="https://www.upress.umn.edu/disciplines/environment" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Environment
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-film_media">
                            <a href="https://www.upress.umn.edu/disciplines/film_media" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Film and Media
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-geography">
                            <a href="https://www.upress.umn.edu/disciplines/geography" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Geography
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-history">
                            <a href="https://www.upress.umn.edu/disciplines/history" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              History
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-literature">
                            <a href="https://www.upress.umn.edu/disciplines/literature" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Literature
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-minnesota-the-upper-midwest">
                            <a href="https://www.upress.umn.edu/disciplines/minnesota-the-upper-midwest" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Minnesota and the Upper Midwest
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-native-american-and-indigenous-studies">
                            <a href="https://www.upress.umn.edu/disciplines/native-american-and-indigenous-studies" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Native American and Indigenous Studies
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-political_science">
                            <a href="https://www.upress.umn.edu/disciplines/political_science" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Political Science
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-psychology">
                            <a href="https://www.upress.umn.edu/disciplines/psychology" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Psychology
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-sociology">
                            <a href="https://www.upress.umn.edu/disciplines/sociology" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Sociology
                            </a>
                          </li>
                          <li className="navTreeItem visualNoMarker navTreeFolderish section-theory_philosophy">
                            <a href="https://www.upress.umn.edu/disciplines/theory_philosophy" title className="state-published navTreeFolderish contenttype-topic">
                              {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                              Theory and Philosophy
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </aside>
                  </div>
                </div>
              </div>{/* /sidebar */}
            </div>
            <div id="main">
              <div id="header">
                <div id="secondary_nav">
                  <ul>
                    <li id="portaltab-index_html">
                      <a href="https://www.upress.umn.edu" title>Home</a>
                    </li><li id="portaltab-current-catalogs">
                      <a href="https://www.upress.umn.edu/current-catalogs" title="Download PDFs and search through various subject catalogs from University of Minnesota Press. Most catalogs feature 30% off of all new trade, regional, and scholarly titles (please check expiration date before ordering).">Current Catalogs</a>
                    </li><li id="portaltab-blog">
                      <a href="http://www.uminnpressblog.com/" title>Blog</a>
                    </li></ul>
                </div>{/* /secondary_nav */}
                <div id="cart_nav">
                  <ul>
                    <li className="first"><a href="https://cdcshoppingcart.uchicago.edu/Cart2/Cart?PRESS=Minnesota" className="view-cart">View Cart</a></li>
                    <li className="last"><a href="https://cdcshoppingcart.uchicago.edu/Cart2/Login?PRESS=Minnesota" className="checkout">Checkout</a></li>
                  </ul>
                </div>{/* /secondary_nav */}			
                <div id="primary_nav">
                  <ul>
                    <li id="portaltab-about-us">
                      <a href="https://www.upress.umn.edu/about-us" title="About the University of Minnesota Press, including our history, current editorial program, community and organizational partners, and staff. ">About the Press</a>
                    </li><li id="portaltab-explore">
                      <a href="https://www.upress.umn.edu/explore" title="Search the University of Minnesota Press's wide-ranging catalog by combining your interest area selects among primary disciplines, secondary disciplines, and customized tags.">Explore Books</a>
                    </li><li id="portaltab-press">
                      <a href="https://www.upress.umn.edu/press" title="Learn about University of Minnesota Press upcoming author events, book awards, book reviews, Press news, key publicity and media contacts, presskits, and how to sign up for media alerts.">News &amp; Events</a>
                    </li><li id="portaltab-information">
                      <a href="https://www.upress.umn.edu/information" title="Find current information about University of Minnesota Press author guidelines, desk and exam copies, permission requests, sales representatives, e-books for libraries, media requests, job openings. ">Information</a>
                    </li><li id="portaltab-book-division" className="selected">
                      <a href="https://www.upress.umn.edu/book-division" title>Book Division</a>
                    </li><li id="portaltab-test-division">
                      <a href="https://www.upress.umn.edu/test-division" title="Minnesota Multiphasic Personality Inventory-2 (MMPI-2) and Restructured Form (MMPI-2-RF), Multidimensional Personality Questionnaire (MPQ), Schedule for Nonadaptive and Adaptive Personality-2 (SNAP-2), MMPI Workshops and Annual Symposium, MTDDA (Minnesota Test for Differential Diagnosis of Aphasia)">Test Division</a>
                    </li><li id="portaltab-journal-division">
                      <a href="https://www.upress.umn.edu/journal-division" title>Journal Division</a>
                    </li></ul>
                </div>
                {/* <a className="trigger-mobile">Menu</a> */}
                <div id="mobile-nav">
                  <div id="primary_nav_mobile" className="primary_nav">
                    <ul>
                      <li id="portaltab-about-us-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/about-us" title="About the University of Minnesota Press, including our history, current editorial program, community and organizational partners, and staff. ">About the Press</a> */}
                      </li>
                      <li id="portaltab-explore-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/explore" title="Search the University of Minnesota Press's wide-ranging catalog by combining your interest area selects among primary disciplines, secondary disciplines, and customized tags.">Explore Books</a> */}
                      </li>
                      <li id="portaltab-press-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/press" title="Learn about University of Minnesota Press upcoming author events, book awards, book reviews, Press news, key publicity and media contacts, presskits, and how to sign up for media alerts.">News &amp; Events</a> */}
                      </li>
                      <li id="portaltab-information-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/information" title="Find current information about University of Minnesota Press author guidelines, desk and exam copies, permission requests, sales representatives, e-books for libraries, media requests, job openings. ">Information</a> */}
                      </li>
                      <li id="portaltab-book-division-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/book-division" title>Book Division</a> */}
                      </li>
                      <li id="portaltab-test-division-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/test-division" title="Minnesota Multiphasic Personality Inventory-2 (MMPI-2) and Restructured Form (MMPI-2-RF), Multidimensional Personality Questionnaire (MPQ), Schedule for Nonadaptive and Adaptive Personality-2 (SNAP-2), MMPI Workshops and Annual Symposium, MTDDA (Minnesota Test for Differential Diagnosis of Aphasia)">Test Division</a> */}
                      </li>
                      <li id="portaltab-journal-division" className="plain">
                        {/* <a href="https://www.upress.umn.edu/journal-division" title>Journal Division</a> */}
                      </li>
                    </ul>
                  </div>
                  <div id="secondary_nav_mobile" className="secondary_nav">
                    <ul>
                      <li id="portaltab-index_html-mobile" className="selected">
                        {/* <a href="https://www.upress.umn.edu" title>Home</a> */}
                      </li>
                      <li id="portaltab-current-catalogs-mobile" className="plain">
                        {/* <a href="https://www.upress.umn.edu/current-catalogs" title="Download PDFs and search through various subject catalogs from University of Minnesota Press. Most catalogs feature 30% off of all new trade, regional, and scholarly titles (please check expiration date before ordering).">Current Catalogs</a> */}
                      </li>
                      <li id="portaltab-blog-mobile" className="plain">
                        {/* <a href="http://www.uminnpressblog.com/" title>Blog</a> */}
                      </li>
                    </ul>
                  </div>{/* /secondary_nav */}
                  <div id="cart_nav_mobile" className="cart_nav">
                    <ul>
                      {/* <li className="first"><a href="https://cdcshoppingcart.uchicago.edu/Cart2/Cart?PRESS=Minnesota" className="view-cart">View Cart</a></li> */}
                      {/* <li className="last"><a href="https://cdcshoppingcart.uchicago.edu/Cart2/Login?PRESS=Minnesota" className="checkout">Checkout</a></li> */}
                    </ul>
                    <dl className="actionMenu deactivated" />
                  </div>{/* /cart_nav */}
                </div>
                <div id="search">
                  <div id="portal-searchbox">
                    {/* <form id="searchGadget_form" action="https://www.upress.umn.edu/@@search" role="search" data-pat-livesearch="ajaxUrl:https://www.upress.umn.edu/@@ajax-search" > */}
                        
                        <label className="hiddenStructure" htmlFor="searchGadget">Search Site</label>
                        
                        <div className="searchSection">
                          <input id="searchbox_currentfolder_only" className="noborder" type="checkbox" name="path" defaultValue="/Plone/book-division/books/bring-that-beat-back" />
                          <label htmlFor="searchbox_currentfolder_only" style={{cursor: 'pointer'}}>only in current section</label>
                        </div>

                        <input name="SearchableText" type="text" size={18} id="searchGadget" title="Search Site" placeholder="Search Site" className="searchField" />
                        <input className="searchButton" type="submit" defaultValue="Search" />

                    {/* </form> */}
                    <div id="portal-advanced-search" className="hiddenStructure">
                      <a href="https://www.upress.umn.edu/@@search">Advanced Search…</a>
                    </div>
                  </div></div>{/* /search */}
                <div id="breadcrumbs"><nav id="portal-breadcrumbs" className="plone-breadcrumb">
                    <div className="container">
                      <span id="breadcrumbs-you-are-here" className="hiddenStructure">You are here:</span>
                      <ol aria-labelledby="breadcrumbs-you-are-here">
                        <li id="breadcrumbs-home">
                          <a href="https://www.upress.umn.edu">Home</a>
                        </li>
                        <li id="breadcrumbs-1">
                          <a href="https://www.upress.umn.edu/book-division">Book Division</a>
                        </li>
                        <li id="breadcrumbs-2">
                          <a href="https://www.upress.umn.edu/book-division/books">Books</a>
                        </li>
                        <li id="breadcrumbs-3">
                          <span id="breadcrumbs-current">{this.props.bookData.title}</span>
                        </li>
                      </ol>
                    </div>
                  </nav></div>{/* /breadcrumbs */}
              </div>{/* /header */}
              <div id="viewlet-above-content">
                <div className="contentwellportlets row" id="portlets-above">
                  <div className="cell AbovePortletManager6 width-full position-0 num-portlets-1">
                    <div id="portletwrapper-436f6e74656e7457656c6c506f72746c6574732e41626f7665506f72746c65744d616e61676572360a636f6e746578740a2f506c6f6e650a6164642d74686973" className="portletWrapper kssattr-portlethash-436f6e74656e7457656c6c506f72746c6574732e41626f7665506f72746c65744d616e61676572360a636f6e746578740a2f506c6f6e650a6164642d74686973">
                      <div className="portletStaticText portlet-static-add-this">
                        <div className="share">
                          <div className="addthis_toolbox addthis_default_style "><a className="addthis_button_email" /> <a className="addthis_button_print" /> <a className="addthis_button_twitter" /> <a className="addthis_button_facebook" /> <a className="addthis_counter addthis_bubble_style" /></div>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div>
              </div><div id="content" className="full">
                <h1>{this.props.bookData.title}</h1>

                {this.props.bookData.subtitle ? 
                <h2>{this.props.bookData.subtitle}</h2>:
                            ''   }

                <div className="details"> 
                  <div className="pub"><strong>2020</strong></div> • &nbsp;
                  <div className="author">
                    <span>Author:</span>
                    <div className="Contributors"><p>{this.props.bookData.authorName}</p></div>
                  </div>
                </div>{/* .details */}
                <div id="slide_holder"> 
                  <div id="overview" className="slide">
                    <a className="pat-plone-modal" data-pat-plone-modal="image: true; title: Cover image;" href={'https://www.upress.umn.edu/book-division/books/'+this.props.bookData.urlTitle+'/image'}>
                      <img src={'https://www.upress.umn.edu/book-division/books/'+this.props.bookData.urlTitle+'/image'} alt={this.props.bookData.title}  height={300} width={198} />
                    </a>
                    <div className="customCopy webCopy">
                      {/* <h3><a href="https://open.spotify.com/playlist/7yPaB5Qjm4VYpT0bR5FVaL?si=hnVnHqGTTf-cEdK1vsh5zQ">SPOTIFY PLAYLIST: BRING THAT BEAT BACK</a></h3> */}
                      <p><strong /></p>
                      <p><strong><em>{this.props.bookData.title}</em> 
                      {this.props.bookData.subtitle ? <em>: {this.props.bookData.subtitle}</em> 
                      : ''} is forty years, from pioneering through crate-digging preservationist and innovation.</strong></p>
                      <p><span><em /></span></p>
                      <p><span><em>{this.props.bookData.title}</em> traces the development of the transformative pop-cultural practice of sampling, 
                      from its origins in the turntable-manning, record-spinning hip-hop DJs of 1970s New York through forty years of musical innovation and reinvention. 
                      {this.props.bookData.authorName} tells the story of how sampling built hip-hop through the lens of four pivotal artists: Grandmaster Flash, Prince Paul, Dr. Dre, and Madlib.<br /><br /></span></p>
                      
                      <br></br>
                      <br></br>
                      <br></br>

                      {/* <p className="p1 callout">"The rise of digital sampling is one of the most important musical development of the late twentieth century. 
                      Nate Patrin’s <i>{this.props.bookData.title}</i> is a rollicking, wide-ranging, and immensely readable history of sample-based music-making: 
                      its origins, its golden ages, and its enormous role in shaping modern popular music. 
                      This book is a must-read for hip-hop obsessives and casual listeners alike."
                      
                      <br /><strong>—Jack Hamilton</strong>, author of <i>Just around Midnight: Rock and Roll and the Racial Imagination</i></p> */}
                      
                      </div>
                  </div>
                  {/* /overview.slide */} 
                  <div id="details" className="slide"> 
                    {/* /full details content */} 
                    <div id="details-image">
                      <div id="details-image-box" className="image-box">
                        <img src={'https://www.upress.umn.edu/book-division/books/'+this.props.bookData.urlTitle+'/image_mini'} alt={this.props.bookData.title} title={this.props.bookData.title} height={210} width={139} />
                      </div>
                      <div id="details-tags">
                        <h3>Tags</h3>
                        <p>
                          <span>
                            <a href="https://www.upress.umn.edu/explore/#c5=Film and Media">Film and Media</a><span>,</span>
                          </span>
                          <span>
                            <a href="https://www.upress.umn.edu/explore/#c5=Cultural Criticism">Cultural Criticism</a><span>,</span>
                          </span>
                          <span>
                            <a href="https://www.upress.umn.edu/explore/#c2=2020 Humanities and Arts catalog">2020 Humanities and Arts catalog</a><span>,</span>
                          </span>
                          <span>
                            <a href="https://www.upress.umn.edu/explore/#c2=2020 Spring">2020 Spring</a><span>,</span>
                          </span>
                          <span>
                            <a href="https://www.upress.umn.edu/explore/#c2=2020 Sociology catalog">2020 Sociology catalog</a>
                          </span>
                        </p>
                      </div>
                    </div>
                    <div id="details-description"><p>Sampling—incorporating found sound and manipulating it into another form entirely—has done more than any musical movement in the twentieth century to maintain a continuum of popular music as a living document and, in the process, has become one of the most successful (and commercial) strains of postmodern art. <em>Bring That Beat Back</em> traces the development of this transformative pop-cultural practice from its origins in the turntable-manning, record-spinning hip-hop DJs of 1970s New York through forty years of musical innovation and reinvention.</p>
                      <p />
                      <p>Nate Patrin tells the story of how sampling built hip-hop through the lens of four pivotal artists: Grandmaster Flash as the popular face of the music’s DJ-born beginnings; Prince Paul as an early champion of sampling’s potential to elaborate on and rewrite music history; Dr. Dre as the superstar who personified the rise of a stylistically distinct regional sound while blurring the lines between sampling and composition; and Madlib as the underground experimentalist and record-collector antiquarian who constantly broke the rules of what the mainstream expected from hip-hop. From these four artists’ histories, and the stories of the people who collaborated, competed, and evolved with them, Patrin crafts a deeply informed, eminently readable account of a facet of pop music as complex as it is commonly underestimated: the aesthetic and reconstructive power of one of the most revelatory forms of popular culture to emerge from postwar twentieth-century America. And you can nod your head to it.</p></div>
                    <div id="details-footer">
                      <p>$22.95 paper ISBN 978-1-5179-0628-3<br />336 pages, 4 b&amp;w photos, 6 1/8 x 9 1/4, April 2020</p>
                    </div>
                  </div> 
                  <div id="author" className="slide"> 
                    <div id="author-image-box" className="image-box">
                      <img src={'https://www.upress.umn.edu/book-division/books/' + this.props.bookData.urlTitle +'/image_cover_medium'} alt="Bring That Beat Back" title="Bring That Beat Back" height={210} width={139} />
                    </div>
                    {/* /author biography content */}
                    <div className="author-bio"><p>
Nate Patrin is a longtime music critic whose writing has appeared in dozens of publications including <em>Pitchfork</em>, <em>Stereogum</em>, <em>Spin</em>, <em>Bandcamp Daily</em>, <em>Red Bull Music Academy</em>, and his hometown Twin Cities’ alt-weekly <em>City Pages</em>. This is his first book.
</p></div>
                  </div>
                  <div id="reviews" className="slide"> 
                    <div id="reviews-image-box" className="image-box">
                      <img src={'https://www.upress.umn.edu/book-division/books/' + this.props.bookData.urlTitle +'/image_cover_medium'} alt={this.props.bookData.title} title={this.props.bookData.title} height={210} width={139} />
                    </div>
                    {/* /.review */} 
                    <div className="review">
                      <div ><p>
The rise of {this.props.bookData.title} is one of the most important musical development of the late twentieth century. {this.props.bookData.author1} <em>{this.props.bookData.title}</em> is a rollicking, wide-ranging, and immensely readable history of sample-based music-making: its origins, its golden ages, and its enormous role in shaping modern popular music. This book is a must-read for hip-hop obsessives and casual listeners alike.
</p></div>
                      <div className="review-source">—<p>
Jack Hamilton, author of <em>Just around Midnight: Rock and Roll and the Racial Imagination</em>
</p></div> 
                    </div>
                    <div className="review">
                      <div className="review-text"><p>
Much like the art of sampling itself, Nate Patrin deftly weaves pieces of history and criticism together to create a compelling new message. <em>Bring That Beat Back</em> is a masterful, scholarly analysis that illustrates just how essential sampling has been to the development of hip-hop and lifts up the oft-overlooked DJs and producers who paved the way for our genrefluid future.
</p></div>
                      <div className="review-source">—<p>
Andrea Swensson, author of <em>Got to Be Something Here: The Rise of the Minneapolis Sound</em>
</p></div> 
                    </div>
                    <div className="review">
                      <div className="review-text"><p>
The painstaking attention to detail and droves of obscure yet essential information will make this book hard for the beat obsessive and music history buff to put down. The wealth of information won't deter the casual music fan, though—<em>Bring That Beat Back</em> is a fascinating read for anyone with a remote interest in hip-hop, breakbeat culture, the tug-of-war between instrumentalists and technology, or how the politics of the music business affects all three. A true breakbeat bonanza extravaganza!
</p></div>
                      <div className="review-source">—<p>
J-Zone, drummer, funk enthusiast, producer, author
</p></div> 
                    </div>
                    <div className="review">
                      <div className="review-text"><p>
If sampling is the most successful form of alchemy ever realized, Nate Patrin's meticulous prose and crate-digging research mirror the dazzling ingenuity of hip-hop's best producers. Breaks and loops are artfully recontextualized into a head-nodding slipstream of history, chronicled in a way to make classic rhythms seem fresh again. A necessary read for anyone who seeks to better understand the last half-century of future sound.
</p></div>
                      <div className="review-source">—<p>
Jeff Weiss, founder and editor of POW (Passion of the Weiss)
</p></div> 
                    </div>{/* /.review */} 
                  </div> 
                  <div id="toc" className="slide"> 
                    <div id="toc-image-box" className="image-box">
                      <img src={'https://www.upress.umn.edu/book-division/books/'+this.props.bookData.urlTitle+ '/image_cover_medium'} alt={this.props.bookData.title} title={this.props.bookData.title} height={210} width={139} />
                    </div>
                    {/* /table of contents */} 
                    <div className="toc">
                      <p>
Contents</p><p>

<br />
</p>Introduction: The Art of the Loop<p>

<br />
</p>Part I. The Grandmaster<p>

<br />
</p>1. Wheels of Steel: How Djs Became Artists<p>

<br />
</p>2. Change the Beat: Hip-Hop’s First Crossover<p>

<br />
</p>3. Funky Drummer: Sampling Reaches the People<p>

<br />
</p>Part II. The Prince<p>

<br />
</p>4. Synthetic Substitution: A New Medium Finds Its Canon<p>

<br />
</p>5. Talkin’ All That Jazz: The Legitimization of an Art Form<p>

<br />
</p>6. Constant Elevation: Hip-Hop’s Rising Underground<p>

<br />
</p>Part III. The Doctor<p>

<br />
</p>7. Funky Enough: How the West was Made<p>

<br />
</p>8. G Thang: The Producer as Superstar<p>

<br />
</p>9. Aftermath: Auteurism in a Post-Gangsta World<p>

<br />
</p>Part IV. The Beat Konducta<p>

<br />
</p>10. The Loop Digga: Sampling Preserves History (and Itself)<p>

<br />
</p>11. The Illest Villains: High Concepts and New Voices<p>

<br />
</p>12. Survival Test: Hip-Hop as a Community<p>

<br />
</p>Epilogue: Breaks and Echoes<p>

<br />
</p>Acknowledgments<p>

<br />
</p>Notes<p>

<br />
</p>Bibliography<p>

<br />
</p>Selected Discography<p>

<br />
</p>Index
                    </div>{/* toc */} 
                  </div> 
                  <div id="materials" className="slide">
                    <div id="materials-image-box" className="image-box">
                      <img src={"https://www.upress.umn.edu/book-division/books/" + this.props.bookData.urlTitle + "/image_cover_medium"} alt={this.props.bookData.title} title={this.props.bookData.title} height={210} width={139} />
                    </div>
                    <div id="materials-text"></div>
                      <p>tweets</p> 
                                       
                    </div> 
                </div>{/* /slide_holder */}
                <div id="purchase">
                  <h3>Purchase</h3>
                  <div id="details-product-list">
                    <div className="add-to-cart-link">
                      <a href="https://cdcshoppingcart.uchicago.edu/Cart2/Cart.aspx?ISBN=9781517906283&PRESS=minnesota">
                        <h3>Paperback</h3>
                        {/*<p tal:content="string:ISBN 9781517906283"></p>*/}
                        <p>$22.95</p>
                      </a>
                    </div>
                    <div className="add-to-cart-button">
                      <a href="https://cdcshoppingcart.uchicago.edu/Cart2/Cart.aspx?ISBN=9781517906283&PRESS=minnesota">
                        <h3>Paperback</h3>
                        {/*<p tal:content="string:ISBN 9781517906283"></p>*/}
                        <p>$22.95</p>
                      </a>
                    </div>
                  </div>
                  <a id="ebooks-link" className="pat-plone-modal" href="https://www.upress.umn.edu/information/buy-ebooks" data-pat-plone-modal="title: About E-books;">About E-books</a>
                  
                  
                  
          {/* <Card style={{width:'255px',height:'300px',backgroundColor:'#f3f3f3'}}>
            <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
              <CardActionArea >
              </CardActionArea> */}
                <div style={{maxHeight:"330px", overflow:"auto"}}>

                {this.props.selectTweetID.map( tweetID =>
        
                  <TwitterTweetEmbed key = {tweetID.tweet_id} tweetId={tweetID.tweet_id}
                  options={{width: 220}}/>)}
                
                </div> 
            {/* </CardContent>   
          </Card> */}

                  {/* <iframe srcdoc='<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Bring The Beat Back: How Sampling Built Hip-Hop author <a href="https://twitter.com/natepatrin?ref_src=twsrc%5Etfw">@natepatrin</a> compiles Adidas In The Pit/Punk Meets Hip-Hop Playlist <a href="https://t.co/XJVaAa6RVh">https://t.co/XJVaAa6RVh</a> <a href="https://t.co/brNraum1M7">pic.twitter.com/brNraum1M7</a></p>&mdash; Matt Horowitz (@SharpCheddar856) <a href="https://twitter.com/SharpCheddar856/status/1299014643143368704?ref_src=twsrc%5Etfw">August 27, 2020</a></blockquote> 
                  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script><blockquote class="twitter-tweet"><p lang="en" dir="ltr">&#39;The Unseen,&#39; the debut album from <a href="https://twitter.com/madlib?ref_src=twsrc%5Etfw">@madlib</a>&#39;s rap alter ego Quasimoto, turns 20 this weekend. In an excerpt from his new book &#39;Bring That Beat Back: How Sampling Built Hip-Hop,&#39; <a href="https://twitter.com/natepatrin?ref_src=twsrc%5Etfw">@natepatrin</a> revisits the landmark LP: <a href="https://t.co/bYrCZ7fLv2">https://t.co/bYrCZ7fLv2</a> <a href="https://t.co/Whqlun1KQe">pic.twitter.com/Whqlun1KQe</a></p>&mdash; Stereogum (@stereogum) <a href="https://twitter.com/stereogum/status/1271101162268299265?ref_src=twsrc%5Etfw">June 11, 2020</a></blockquote> 
                  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' title="widget" height="330px" width="255px" />
                 */}
                
                </div>
            
                <div id="slide_nav"> 
                  <h3>About This Book</h3> 
                  <ul> 
                    <li><a href="#" className="active">Overview</a></li> 
                    <li><a href="#">Full Details</a></li> 
                    <li><a href="#">Author Bio</a></li> 
                    <li><a href="#">Reviews</a></li> 
                    <li><a href="#">Table of Contents</a></li> 
                    <li><a href="#">Beyond the Book</a></li>
                    {/* <li><a href="">Twitter</a></li>  */}

                  </ul> 
                </div> 
                <div id="related_pubs"> 
                  <h3>Related Publications</h3> 
                  {/* /five related publications */} 
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/got-to-be-something-here">
                      <img src="https://www.upress.umn.edu/book-division/books/got-to-be-something-here/@@images/b8e95057-eb3b-4a9c-87a7-29de49a048c2.jpeg" alt="Got to Be Something Here: The Rise of the Minneapolis Sound" title="Got to Be Something Here: The Rise of the Minneapolis Sound" height={128} width={100} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/got-to-be-something-here">Got to Be Something Here</a>
                    <span className="subTitle">The Rise of the Minneapolis Sound</span>
                    <span className="description"> 
                    The story, from start to superstardom, of the musicians who shaped the Minneapolis Sound
                  </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/murray-talks-music">
                      <img src="https://www.upress.umn.edu/book-division/books/murray-talks-music/@@images/0acceabc-da42-4c97-bb2e-a308012118c7.jpeg" alt="Murray Talks Music: Albert Murray on Jazz and Blues" title="Murray Talks Music: Albert Murray on Jazz and Blues" height={145} width={96} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/murray-talks-music">Murray Talks Music</a>
                    <span className="subTitle">Albert Murray on Jazz and Blues</span>
                    <span className="description"> 
Rare and previously unpublished work from an influential critic, cultural theorist, and champion of jazz
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/everybodyas-heard-about-the-bird">
                      <img src="https://www.upress.umn.edu/book-division/books/everybodyas-heard-about-the-bird/@@images/873c0cdd-d828-4b5c-b40e-bcf14dfd554a.jpeg" alt="Everybody’s Heard about the Bird: The True Story of 1960s Rock ’n’ Roll in Minnesota" title="Everybody’s Heard about the Bird: The True Story of 1960s Rock ’n’ Roll in Minnesota" height={128} width={100} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/everybodyas-heard-about-the-bird">Everybody’s Heard about the Bird</a>
                    <span className="subTitle">The True Story of 1960s Rock ’n’ Roll in Minnesota</span>
                    <span className="description"> 
The first comprehensive history to trace the evolution of Minnesota 1960s rock and roll
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/filipinos-represent">
                      <img src="https://www.upress.umn.edu/book-division/books/filipinos-represent/@@images/c3ead21a-bab9-4f6c-bd84-cf71ec4f9058.jpeg" alt="Filipinos Represent: DJs, Racial Authenticity, and the Hip-hop Nation" title="Filipinos Represent: DJs, Racial Authenticity, and the Hip-hop Nation" height={145} width={94} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/filipinos-represent">Filipinos Represent</a>
                    <span className="subTitle">DJs, Racial Authenticity, and the Hip-hop Nation</span>
                    <span className="description"> 
What does it mean when Filipino youth lay claim to an art form associated with African Americans? 
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/footsteps-in-the-dark">
                      <img src="https://www.upress.umn.edu/book-division/books/footsteps-in-the-dark/@@images/8e8d658f-2005-4939-afe0-c4a531763320.jpeg" alt="Footsteps in the Dark: The Hidden Histories of Popular Music" title="Footsteps in the Dark: The Hidden Histories of Popular Music" height={145} width={94} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/footsteps-in-the-dark">Footsteps in the Dark</a>
                    <span className="subTitle">The Hidden Histories of Popular Music</span>
                    <span className="description"> 
The diversity of America’s pop music landscape and an engaging exposition of why it matters so much
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/lemon-jail">
                      <img src="https://www.upress.umn.edu/book-division/books/lemon-jail/@@images/c728d1a5-bb14-46e0-be45-f5143b6dbbc2.jpeg" alt="Lemon Jail: On the Road with the Replacements" title="Lemon Jail: On the Road with the Replacements" height={133} width={100} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/lemon-jail">Lemon Jail</a>
                    <span className="subTitle">On the Road with the Replacements</span>
                    <span className="description"> 
A tour diary of life on the road with one of Minnesota’s greatest bands—with nearly 100 never-before-seen photographs
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/gold-experience">
                      <img src="https://www.upress.umn.edu/book-division/books/gold-experience/@@images/d6592e2b-73c3-4859-b505-cdfc0d417280.jpeg" alt="Gold Experience: Following Prince in the ’90s" title="Gold Experience: Following Prince in the ’90s" height={145} width={90} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/gold-experience">Gold Experience</a>
                    <span className="subTitle">Following Prince in the ’90s</span>
                    <span className="description"> 
Rare interviews, live reviews, little known stories, and close encounters: Prince in a time of crazy brilliant music and life
 
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/in-the-break">
                      <img src="https://www.upress.umn.edu/book-division/books/in-the-break/@@images/8e776bfe-3ce3-4443-ad9c-e20209101f47.jpeg" alt="In the Break: The Aesthetics of the Black Radical Tradition" title="In the Break: The Aesthetics of the Black Radical Tradition" height={145} width={94} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/in-the-break">In the Break</a>
                    <span className="subTitle">The Aesthetics of the Black Radical Tradition</span>
                    <span className="description"> 
Investigates the connections between jazz, sexual identity, and radical black politics
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/stare-in-the-darkness">
                      <img src="https://www.upress.umn.edu/book-division/books/stare-in-the-darkness/@@images/c3fabc0e-e67b-4cb3-bdcc-5b1d2262a5f2.jpeg" alt="Stare in the Darkness: The Limits of Hip-hop and Black Politics" title="Stare in the Darkness: The Limits of Hip-hop and Black Politics" height={145} width={94} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/stare-in-the-darkness">Stare in the Darkness</a>
                    <span className="subTitle">The Limits of Hip-hop and Black Politics</span>
                    <span className="description"> 
Critiquing the true impact of hip-hop culture on politics
 </span>
                  </div>
                  <div>
                    <a className="CoverImage" href="https://www.upress.umn.edu/book-division/books/out-of-the-vinyl-deeps">
                      <img src="https://www.upress.umn.edu/book-division/books/out-of-the-vinyl-deeps/@@images/172dbd61-74d8-434a-9eff-078e6a2649dc.jpeg" alt="Out of the Vinyl Deeps: Ellen Willis on Rock Music" title="Out of the Vinyl Deeps: Ellen Willis on Rock Music" height={145} width={96} />
                    </a>
                    <a className="itemTitle" href="https://www.upress.umn.edu/book-division/books/out-of-the-vinyl-deeps">Out of the Vinyl Deeps</a>
                    <span className="subTitle">Ellen Willis on Rock Music</span>
                    <span className="description"> 
Rediscover the astute and passionate music writings of the pioneering rock critic for the New Yorker
 </span>
                  </div>
                </div> 
                <div id="related_news"> 
                  <h3>Related News &amp; Events</h3> 
                  <p><a className="BookRelatedLink pat-plone-modal" data-pat-plone-modal="content: #all-clips; title: All Related News;" href="https://www.upress.umn.edu/book-division/books/bring-that-beat-back#all-clips">In the News</a></p>
                  <p><a href="https://www.upress.umn.edu/press/press-clips/the-arts-fuse-bring-that-beat-back">The Arts Fuse: Bring That Beat Back</a></p>
                  <p><a href="https://www.upress.umn.edu/press/press-clips/rock-and-roll-book-club-bring-that-beat-back">Rock and Roll Book Club: Bring That Beat Back</a></p>
                  <p><a href="https://www.upress.umn.edu/press/press-clips/scratched-vinyl-bring-that-beat-back">Scratched Vinyl: Bring That Beat Back</a></p>
                  <div className="OverlayDiv BookRelatedBox" id="all-clips">
                    <div className="OverlayContentWrapper">
                      <div><p><a href="https://www.upress.umn.edu/press/press-clips/the-arts-fuse-bring-that-beat-back">The Arts Fuse: Bring That Beat Back</a></p><p>Review of Bring That Beat Back by Nate Patrin </p><br /></div>
                      <div><p><a href="https://www.upress.umn.edu/press/press-clips/rock-and-roll-book-club-bring-that-beat-back">Rock and Roll Book Club: Bring That Beat Back</a></p><p>Interview with Bring That Beat Back author Nate Patrin</p><br /></div>
                      <div><p><a href="https://www.upress.umn.edu/press/press-clips/scratched-vinyl-bring-that-beat-back">Scratched Vinyl: Bring That Beat Back</a></p><p>Review of Bring That Beat Back by Nate Patrin</p><br /></div>
                      <div><p><a href="https://www.upress.umn.edu/press/press-clips/dad-bod-rap-pod-bring-that-beat-back">Dad Bod Rap Pod: Bring That Beat Back </a></p><p>Podcast interview with Nate Patrin, author of Bring That Beat Back</p><br /></div>
                    </div>
                  </div>
                </div>
                <div className="contentwellportlets row" id="portlets-below">
                </div></div>{/* /content */}
              {/* /right */}
            </div>{/* /main */}
          </div>{/* /.wrapper */}
          <div className="mobile block nav">
            <div className="portletWrapper" id="portletwrapper-706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a636f6d696e672d736f6f6e" data-portlethash="706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a636f6d696e672d736f6f6e"><div className="portletStaticText portlet-static-coming-soon"><p><a href="https://www.upress.umn.edu/book-division/collections/forthcoming-from-ump" className="internal-link" id="forthcoming-titles">Coming soon</a></p></div>
            </div>
            <div className="portletWrapper" id="portletwrapper-706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a6e617669676174696f6e" data-portlethash="706c6f6e652e6c656674636f6c756d6e0a636f6e746578740a2f506c6f6e650a6e617669676174696f6e">
              <aside className="portlet portletNavigationTree" role="navigation">
                <header className="portletHeader">
                  <a href="https://www.upress.umn.edu/disciplines" className="tile">Disciplines</a>
                </header>
                <nav className="portletContent lastItem">
                  <ul className="navTree navTreeLevel0">
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-american-studies">
                      <a href="https://www.upress.umn.edu/disciplines/american-studies" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        American Studies
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-anthropology">
                      <a href="https://www.upress.umn.edu/disciplines/anthropology" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Anthropology
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-architecture_and_design">
                      <a href="https://www.upress.umn.edu/disciplines/architecture_and_design" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Architecture and Design
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-art_performance">
                      <a href="https://www.upress.umn.edu/disciplines/art_performance" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Art and Performance
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-cultural_criticism">
                      <a href="https://www.upress.umn.edu/disciplines/cultural_criticism" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Cultural Criticism
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-economics_business">
                      <a href="https://www.upress.umn.edu/disciplines/economics_business" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Economics and Business
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-education_law">
                      <a href="https://www.upress.umn.edu/disciplines/education_law" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Education and Law
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-environment">
                      <a href="https://www.upress.umn.edu/disciplines/environment" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Environment
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-film_media">
                      <a href="https://www.upress.umn.edu/disciplines/film_media" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Film and Media
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-geography">
                      <a href="https://www.upress.umn.edu/disciplines/geography" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Geography
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-history">
                      <a href="https://www.upress.umn.edu/disciplines/history" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        History
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-literature">
                      <a href="https://www.upress.umn.edu/disciplines/literature" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Literature
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-minnesota-the-upper-midwest">
                      <a href="https://www.upress.umn.edu/disciplines/minnesota-the-upper-midwest" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Minnesota and the Upper Midwest
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-native-american-and-indigenous-studies">
                      <a href="https://www.upress.umn.edu/disciplines/native-american-and-indigenous-studies" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Native American and Indigenous Studies
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-political_science">
                      <a href="https://www.upress.umn.edu/disciplines/political_science" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Political Science
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-psychology">
                      <a href="https://www.upress.umn.edu/disciplines/psychology" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Psychology
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-sociology">
                      <a href="https://www.upress.umn.edu/disciplines/sociology" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Sociology
                      </a>
                    </li>
                    <li className="navTreeItem visualNoMarker navTreeFolderish section-theory_philosophy">
                      <a href="https://www.upress.umn.edu/disciplines/theory_philosophy" title className="state-published navTreeFolderish contenttype-topic">
                        {/* THIS BREAKS with
                  Module plone.namedfile.scaling, line 523, in tag
                  Module plone.app.imaging.scaling, line 230, in tag
                TypeError: 'NoneType' object has no attribute '__getitem__'
            */}
                        Theory and Philosophy
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>
            </div>
          </div>
          <div id="footer">
            <div className="wrapper">
              <p>© <span id="copyright-years">2011-2016</span> University of Minnesota Press | <a href="http://www.privacy.umn.edu/">Privacy Policy</a> | The University of Minnesota is an equal opportunity educator and employer.</p>
            </div>{/* /.wrapper */}
          </div>{/* /footer */}
          {/*  initialize the slideshow when the DOM is ready */} 
          {/* google analytics and other JS tracking code goes here */}
        </div>
      </div>
    
    </>
    )}}

    BookPageMock.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    const mapStateToProps = state => ({
      selectTweetID: state.selectTweetID,
      bookData: state.bookData
      });

  export default withRouter(connect(mapStateToProps)(BookPageMock));
