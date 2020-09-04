import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';
import InclusionToggle from './InclusionToggle'

class PublicationItem extends Component {

    state = {
        status: null
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
        console.log(this.props.match.params.id);

        console.log(this.state)
    }

    handleSelect = () => {
        // assign select drop-down menu from DOM to variable 'status'
        const status = document.getElementById("status-select");
        // conditional to check value from select drop-down menu
        if(status.value === "TRUE"){
            this.setState({
                status: true
            })
        } else if (status.value === "FALSE") {
            this.setState({
                status: false
            })
        } else if (status.value === "NULL") {
            this.setState({
                status: null
            })
        } else {
            return null;    
        }
    }
    render() {
        // prevents init reducer from throwing TypeError when calling 'findIndex'
        if (this.props.publication.findIndex === undefined) return null;
        // Converts selected publication id to Number and assigns to variable 'id'
        const id = Number(this.props.match.params.id);
        // finds the index for selected Publication ('id') in publication reducer
        const index = this.props.publication.findIndex(i=>i.id === id);
        // prevents TypeError on load from referencing an index item of the init reducer
        if (this.props.publication[index] === undefined) return null;

        return (
            <>
                <div className="content">
                    <h1>Tweets for Publication Item</h1>
                    <select id="status-select" onChange={this.handleSelect}>
                    <option value="NULL">Undecided</option>
                    <option value="TRUE">Approved</option>
                    <option value="FALSE">Rejected</option>
                    </select>

                    <InclusionToggle publicationId={this.props.match.params.id} include={this.props.publication[index].include}/>
                    {this.props.dbTweets.map( tweet =>
                    <>
                    {Number(tweet.publication_id) === Number(this.props.match.params.id) && tweet.approved === this.state.status ?
                    <TwitterTweetEmbed key = {tweet.index} tweetId={tweet.tweet_id}
                    options={{width: 250}}/>
                    : ''}
                    </>
                    )}
                </div>
            </>
        )
    }
}

PublicationItem.propTypes = {
    classes: PropTypes.object.isRequired
  };

const mapStateToProps = (state) => ({
    errors: state.errors,
    publication: state.publication,
    dbTweets: state.dbTweets,

});

export default connect(mapStateToProps)(PublicationItem);
