const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {default: axios} = require('axios');
const token = process.env.BEARER_TOKEN;
var cron = require('node-cron');
 
// one schedule to rule them all, and in the Twitter find them


let publications = [];

cron.schedule('0 0,20,40 1,2 * * *', () => {

  // GET all publications from database and save to publications array
  console.log('Getting Publications');
  const queryText = `
  SELECT * FROM publication
  ORDER BY title ASC`
  pool.query(queryText)
  .then( (response) => {
    console.log( 'Successfully got publication data');
    publications = response.rows;

    // Filter out any publications with include value of false
    publications = publications.filter(x => x.include === true);
    
    // re-order publications based on last_searched value
    let nullOnly = publications.filter(x => x.last_searched === null);
    let notNull = publications.filter(x => x.last_searched !== null);
    notNull.sort((a, b) => parseFloat(((new Date(a.last_searched)).getTime())) - parseFloat(((new Date(b.last_searched)).getTime())));
    publications = nullOnly.concat(notNull)

    // create a query for each publication (up to limit) and search 
    for (let i=0;i<450;i++){

      // replace special characters from titles/authors so twitter is happy
      let title = publications[i].title.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, '');
      let author = '';
      let subtitle = title;
      if (publications[i].subtitle.length > 0){
        subtitle = publications[i].subtitle.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, '');
      }
      let authorArr = publications[i].author1.split(',');
      if (authorArr.length > 1){
        author = authorArr[0].replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, '');
      } else {author = publications[i].author1.replace(/["&;#^%[\|/{}]/g,'*').replace(/]/g,'*').normalize('NFKD').replace(/[^\w\s.-_\*/']/g, '')};

      // check the search type and build the corresponding query for twitter
      let twitterQuery = '';
      switch(publications[i].search_type) {
        // Exact Match Title
        case 'T':
          twitterQuery = `"${title}"`;
        break;
        // Exact Title AND Exact Author Last Name
        case 'TaA':
          twitterQuery `"${title}" "${author}"`;
        break;
        // Exact Title AND Exact Subtitle
        case 'TaS':
          twitterQuery = `"${title}" "${subtitle}"`;
        break;
        // Exact Title OR Exact Subtitle  
        case 'ToS':
          twitterQuery = `"${title}" OR "${subtitle}"`;
        break;
        // Exact Subtitle
        case 'S':
          twitterQuery = `"${subtitle}"`;
        break;
        // Exact Subtitle AND Exact Author Last Name
        case 'SaA':
          twitterQuery = `"${subtitle}" "${author}"`;
        break;
        // Exact Title AND Author Last Name OR Subtitle
        case 'TaAoS':
          twitterQuery = `"${title}" "${author}" OR "${subtitle}"`;
        break;
      }

      //send the query to Twitter
      console.log('searching Twitter for: ',twitterQuery)
      axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${twitterQuery}&max_results=10&tweet.fields=possibly_sensitive,referenced_tweets`, {
        headers: {'Authorization': `Bearer ${token}`}
      })
      .then((response)=>{
        console.log({body: response.data.data, header: response.headers});


        // iterate through each tweet and save their ids to the database
        let tweets = response.data.data;
        if (tweets !== undefined){
          for (let tweet of tweets) {
            const tweetId = tweet.id;
            const publicationId = publications[i].id
            //filter out sensitive tweets and retweets
            if(tweet.possibly_sensitive === false && !onlyRetweets(tweet)){

              // save any search results from twitter to the database
              const saveTweetQuery = `
              INSERT INTO "tweet" ("publication_id", "tweet_id")
              SELECT $1 AS "publication_id", CAST($2 AS VARCHAR(100)) AS "tweet_id" 
              WHERE NOT EXISTS (SELECT * FROM tweet WHERE publication_id = $1 AND tweet_id = $2);`
            
              pool.query(saveTweetQuery, [publicationId, tweetId])
              .then(() => console.log('Saved Tweet: ', tweetId))
              .catch((error) => {console.log('error updating timestamp: ', error)
              });
            }
          }
        }

        //update the publication last_searched value to current time
        pool.query(`
        UPDATE "publication" 
        SET "last_searched" = CURRENT_TIMESTAMP 
        WHERE id = ${publications[i].id};`)
        .then(() => console.log('Updated Timestamp'))
        .catch((error) => {console.log('error updating timestamp: ', error);
        });


      })
      .catch((error)=>{
          console.log('error with Twitter GET', error);
      });
    }
  })
  .catch((err) => {
    console.log("An error occured while getting publications:", err);
  });
});



//checks if tweet is a retweet
function onlyRetweets(tweet){  
  if(tweet.hasOwnProperty('referenced_tweets')){
      for(let j=0;j<tweet.referenced_tweets.length;j++){
          if(tweet.referenced_tweets[j].type==='quoted'||tweet.referenced_tweets[j].type==='replied_to'){
            return false;
          }
      }
      return true;
    }else{
      return false;
  }
}//end onlyRetweets


const schedule = console.log('SCHEDULE HI')

module.exports = schedule;