import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';



const TweetsPage = () => {

  //get publication id from url, then fetch tweet ids from the database
  function fetchTweets() {
    fetch('/api/tweets/'+ window.location.href.replace('http://localhost:3000/#/books/',''),
      { method: 'GET',
        mode: 'no-cors',}
    ).then( response => response.json()
      ).then(data=> {
        for(let i=0;i<data.length;i++){
          fetch('/api/tweets/'+ window.location.href.replace('http://localhost:3000/#/books/','') + '/' +data[i].tweet_id,
          { method: 'GET',
          mode: 'no-cors',}
          ).then(response=> response.text()
            ).then(html => {
              const scriptElement = document.createElement( "script" );
              let tweetContainer = document.getElementById('viewTweets');
              let tweetDiv = document.createElement('div');
              tweetDiv.innerHTML = html;
              tweetContainer.append(tweetDiv);
            })
        }}
      ).catch((error) => {console.error('Error fetching embed html', error);}
    ).catch( error => console.error('Error fetching tweet ID', error) )
  }

 fetchTweets()

 return (<div id="viewTweets">
        </div>)
}

export default connect()(TweetsPage);


   