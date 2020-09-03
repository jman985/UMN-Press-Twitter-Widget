import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';



const Widget = () => {


function fetchTweets() {

    //pull out url into variable to be easily swapped out?
    //get publication id from url, then fetch tweet ids from the database
    
    fetch('/api/tweets/'+ window.location.href.replace('http://localhost:3000/#/books/',''),
    { method: 'GET',
      mode: 'no-cors',
                      }
    ).then( response => {response.json()

   
    }
    ).then(data=> {
        console.log('tweet ids:',data);

        for(let i=0;i<data.length;i++){
            console.log('tweet id', data[i].tweet_id);
            
            fetch('/api/tweets/'+ window.location.href.replace('http://localhost:3000/#/books/','') + '/' +data[i].tweet_id,
            { method: 'GET',
            mode: 'no-cors',
                            }

            ).then(response=> response.text()
            
            ).then(html => {console.log('this is the tweet html', html)

            const scriptElement = document.createElement( "script" );

            scriptElement.addEventListener(
				    "load",
				      function() {
                    console.log( 'Successfully loaded twitter widget script using (addEventListener).' );

                    let tweetContainer = document.getElementById('viewTweets');
                    console.log(tweetContainer);

                    let tweetDiv = document.createElement('div');
                    console.log(html);

                    tweetDiv.innerHTML = html;
                    // console.log(tweetLi);
                    tweetContainer.append(tweetDiv);
                }
              )
            scriptElement.src = "https://platform.twitter.com/widgets.js";
            scriptElement.async = true;

            document.body.appendChild( scriptElement );
          })

        }}
            ).catch((error) => {console.error('Error fetching embed html', error);}
    
    ).catch( error => console.error('Error fetching tweet ID', error) )

    }

 fetchTweets()

 return (<div id="viewTweets">
        </div>)

}
  
export default connect()(Widget);


   