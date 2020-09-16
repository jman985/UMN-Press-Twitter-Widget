import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UserPage from "../UserPage/UserPage";
import Publications from "../Publications/Publications";
import PublicationItem from "../PublicationItem/PublicationItem";
import TweetsPage from "../TweetsPage/TweetsPage";
import "./App.css";
import BookPageMock from "../BookPageMock/BookPageMock";
import BookPageMock2 from "../BookPageMock/BookPageMock2";


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
    this.props.dispatch({ type: "FETCH_PUBLICATIONS" });
    this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
  }


  render() {
    return (
      <Router>
        <div>
        {window.location.href.includes('/books/') ? null : 
        (<Nav />)}
          <Switch>
            <Redirect exact from="/" to="/publications" />
            <Route exact path="/books/:publication_id" component={BookPageMock} />
            <Route exact path="/books/2/:publication_id" component={BookPageMock2} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/publications" component={Publications} />
            <ProtectedRoute exact path="/publications/:id" component={PublicationItem} />
            <ProtectedRoute exact path="/tweets" component={TweetsPage} />
            <ProtectedRoute exact path="/upload" component={UserPage} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
          </Router>
        
    );
  }
}

export default connect()(App);
