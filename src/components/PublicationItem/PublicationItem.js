import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';

class PublicationItem extends Component {

    state = {
        status: false
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
        console.log(this.state)
    }

    handleSelect = () => {
        console.log('selected a status');
        const status = document.getElementById("status-select");
        if(status.value === "TRUE"){
            this.setState({
                status: true
            })
            console.log(this.state);
        } else if (status.value === "FALSE") {
            this.setState({
                status: false
            })
            console.log('selected rejected');
        } else if (status.value === "NULL") {
            this.setState({
                status: null
            })
        } else {
            
            console.log('whaddya know, somn gotta happen');
        }
    }
    render() {
        const status = document.getElementById("status-select");
        return (
            
            <>
                <div className="content">
                    <h1>Tweets for Publication Item</h1>
                    <select id="status-select" onChange={this.handleSelect}>
                    <option value="NULL">Undecided</option>
                    <option value="TRUE">Approved</option>
                    <option value="FALSE">Rejected</option>
                    </select>

                    <div >
                    {/* <Widget/> */}
                    </div>

                    {this.props.dbTweets.map( tweetID =>
                    
                    <>
                    
                    {/* {JSON.stringify(tweetID.publication_id)} */}
                    {Number(tweetID.publication_id) === Number(this.props.match.params.id) && tweetID.approved === this.state.status ?
                    <TwitterTweetEmbed key = {tweetID.index} tweetId={tweetID.tweet_id}
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

const mapStateToProps = state => ({
    errors: state.errors,
    publication: state.publication,
    dbTweets: state.dbTweets,

});

export default connect(mapStateToProps)(PublicationItem);
