import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';

class PublicationItem extends Component {

    state = {
        status: ''
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_DATABASE_TWEETS', payload: this.props.match.params.id});
    }

    handleSelect = () => {
        console.log('selected a status');
        const status = document.getElementById("status-select");
        if(status.value === "approved"){
            this.setState({
                status: "approved"
            })
            console.log(this.state);
        } else if (status.value === "rejected") {
            console.log('selected rejected');
        } else {
            console.log('whaddya know, somn gotta happen');
        }
    }
    render() {
        return (
            <>
                <div className="content">
                    <h1>Tweets for Publication Item</h1>
                    <select id="status-select" onChange={this.handleSelect}>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    </select>

                    <div >
                    {/* <Widget/> */}
                    </div>

                    {this.props.selectTweetID.map( tweetID =>
                    
                    <TwitterTweetEmbed key = {tweetID.index} tweetId={tweetID.tweet_id}
                    options={{width: 250}}/>

                    )}

                </div>
            </>
        )
    }

}

PublicationItem.propTypes = {
    classes: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    errors: state.errors,
    publication: state.publication,
    selectTweetID: state.selectTweetID,

});

export default connect(mapStateToProps)(PublicationItem);
