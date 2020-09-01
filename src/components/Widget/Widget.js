import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from "react-router";



const Widget = () => {


function fetchTweets() {

    fetch('/api/tweets/'+ window.location.href.replace('http://localhost:3000/#/books/',''),
    { method: 'GET',
      mode: 'no-cors',
                      }
  )
  .then( response => response.json() )

  .then( data => fetchEmbedTweets(data))

.catch( error => console.error('error:', error) )}

function fetchEmbedTweets(data) {
    console.log('this is the data', data);
    
    for (let i=0; i<data.length; i++){

        console.log('this is the tweet', data[i].tweet_id);

        fetch('/'+ data[i].tweet_id,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer AAAAAAAAAAAAAAAAAAAAALo%2FHAEAAAAADac6xyDfgK5%2F8F%2FOuotBdu5ScAQ%3D9KfnjQfZnNeDoS7yHkm9IKV833yOTRGNLFalNxa4aNHIpH0YDw`
                },
            mode: 'no-cors',
          })
          .then(response => response.json())

          .then(json => console.log(json))

          .catch( error => console.error('error:', error))
    }
 
}

return fetchTweets()

}
  
export default connect()(Widget);

    // ReactDOM.render(
    //     <Widget />,
    //     document.getElementById('root')
    //   );

    // const tweetUL = document.querySelector('#viewTweets');
        // const tweetLi = document.createElement('li');
        // console.log(tweetUL);

        // tweetLi.innerHTML = data[i].tweet_id;
        // console.log(tweetLi);

        // tweetUL.append(tweetLi);