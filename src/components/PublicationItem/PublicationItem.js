import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import PropTypes from 'prop-types';
import InclusionToggle from './InclusionToggle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

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


class PublicationItem extends Component {

    state = {
        status: null,
        tweetsArray: [1,2,3],
        key1: 0,
        key2: 1,
        key3: 2,
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
        console.log(this.props.match.params.id);
        console.log('MOUNTED')
        let status = this.state.status;
        let filteredArray = this.props.dbTweets.filter(function (filteredTweets) {
          return filteredTweets.approved === status});

        let pubId = Number(this.props.match.params.id);
        let finalArray = filteredArray.filter(function (filteredTweets) {
          return Number(filteredTweets.publication_id) === pubId});

        this.setState({tweetsArray: finalArray});
    }

      // this is needed to get the database tweets into this.state.tweetsArray
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.dbTweets !== this.props.dbTweets || prevState.status !== this.state.status){
        console.log('componentDidUpdate has triggered')
        let status = this.state.status;
        let filteredArray = this.props.dbTweets.filter(function (filteredTweets) {
          return filteredTweets.approved === status});

        let pubId = Number(this.props.match.params.id);
        let finalArray = filteredArray.filter(function (filteredTweets) {
          return Number(filteredTweets.publication_id) === pubId});

        // console.log('these are the tweets that match the status', filteredArray)
        // console.log('these are the tweets that match the status and pub_id', finalArray)
        // console.log('this should be the status:', status)
        // console.log('this should be the match id:', pubId)

        this.setState({tweetsArray: finalArray});
      }
    } 

    handleApprove = (tweetId, slot, approved) => {
      // send the approve/reject based on which button was pressed
      if (approved){
        this.props.dispatch({type:'APPROVE_TWEET', payload: tweetId});
      } else {
        this.props.dispatch({type:'REJECT_TWEET', payload: tweetId});
      }
  
      // check to see which slot was changed and update the corresponding key with the next index in the array of tweets
      if (slot === 0){
        this.setState({ key1: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
      } else if (slot === 1){
        this.setState({ key2: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
      } else if (slot === 2){
        this.setState({ key3: Math.max(this.state.key1,this.state.key2,this.state.key3)+1});
      }
      ;
    }

    handleSelect = () => {
        // assign select drop-down menu from DOM to variable 'status'
        this.props.dispatch({type: 'FETCH_DATABASE_TWEETS'});
        const status = document.getElementById("status-select");
        console.log('status changed:', this.state.status)
        // conditional to check value from select drop-down menu
        if(status.value === "TRUE"){
            this.setState({status: true})
        } else if (status.value === "FALSE") {
            this.setState({status: false})
        } else if (status.value === "NULL") {
            this.setState({status: null})
        } else {
            return null;    
        }
    }
    
    render() {
      const { classes } = this.props;
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
          {/* {JSON.stringify(this.state.tweetsArray)} */}
          <div className="content">
            <h1>{this.props.publication[index].title}, {this.props.publication[index].author1} </h1>
            <select id="status-select" onChange={this.handleSelect}>
              <option value="NULL">Undecided</option>
              <option value="TRUE">Approved</option>
              <option value="FALSE">Rejected</option>
            </select>
            <InclusionToggle publicationId={this.props.match.params.id} include={this.props.publication[index].include}/>
          </div>

          <div className={classes.root} style={{display: "flex",flexWrap: "wrap",justifyContent:'center'}}>
            <div key={this.state.status+1} style={{display:'flex'}}>
            {this.state.tweetsArray[this.state.key1] ?
              <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
                <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <CardActionArea onClick={()=>{this.props.history.push(`publications/${this.state.tweetsArray[this.state.key1].publication_id}`)}}>
                    <Typography gutterBottom variant="h6">
                      Title: {this.state.tweetsArray[this.state.key1].title} <br />
                      Author: {this.state.tweetsArray[this.state.key1].author1}
                    </Typography>
                  </CardActionArea>
                    <div style={{maxHeight:"500px", overflow:"auto"}}>
                      <TwitterTweetEmbed key={this.state.key1} tweetId={this.state.tweetsArray[this.state.key1].tweet_id}/>      
                    </div>
                  <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,true)}>Approve</Button>
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key1].id,0,false)}>Reject</Button>
                  </CardActions>
                </CardContent>   
              </Card>
            : ''}
            </div>

            <div key={this.state.status+2} style={{display:'flex'}}>
            {this.state.tweetsArray[this.state.key2] ?
              <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
                <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <CardActionArea onClick={()=>{this.props.history.push(`publications/${this.state.tweetsArray[this.state.key2].publication_id}`)}}>
                    <Typography gutterBottom variant="h6">
                      Title: {this.state.tweetsArray[this.state.key2].title} <br />
                      Author: {this.state.tweetsArray[this.state.key2].author1}
                    </Typography>
                  </CardActionArea>
                    <div style={{maxHeight:"500px", overflow:"auto"}}>
                      <TwitterTweetEmbed key={this.state.key2} tweetId={this.state.tweetsArray[this.state.key2].tweet_id}/>      
                    </div>
                  <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,true)}>Approve</Button>
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key2].id,1,false)}>Reject</Button>
                  </CardActions>
                </CardContent>   
              </Card>
            : ''}
            </div>

            <div key={this.state.status+3} style={{display:'flex'}}>
            {this.state.tweetsArray[this.state.key3] ?
              <Card className={classes.card} variant="outlined" style={{width:'450px',height:'600px',backgroundColor:'#f3f3f3'}}>
                <CardContent style={{display:"flex", flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <CardActionArea onClick={()=>{this.props.history.push(`publications/${this.state.tweetsArray[this.state.key3].publication_id}`)}}>
                    <Typography gutterBottom variant="h6">
                      Title: {this.state.tweetsArray[this.state.key3].title} <br />
                      Author: {this.state.tweetsArray[this.state.key3].author1}
                    </Typography>
                  </CardActionArea>
                    <div style={{maxHeight:"500px", overflow:"auto"}}>
                      <TwitterTweetEmbed key={this.state.key3} tweetId={this.state.tweetsArray[this.state.key3].tweet_id}/>      
                    </div>
                  <CardActions style={{display:"flex", justifyContent: "space-around",marginBottom:'25px'}}>
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,true)}>Approve</Button>
                    <Button variant="outlined" color="primary" onClick={()=>this.handleApprove(this.state.tweetsArray[this.state.key3].id,2,false)}>Reject</Button>
                  </CardActions>
                </CardContent>   
              </Card>
            : ''}
            </div>
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

export default connect(mapStateToProps)(withStyles(styles)(PublicationItem));
