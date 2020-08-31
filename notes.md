# Pseudo Code (ADMIN side)

1. Admin presses upload button and selects CSV file

2. CSV file is parsed into a database table called “publications” publications that have already been added to the database are ignored.

3. The Publications table includes a “last_searched” column to indicate when the most recent search was done for that specific publication (TIMESTAMP).

4. Admin presses search/find tweets button. A “Getting Tweets” message appears for the duration of the GET process.

5. Code checks the publications table for the row with the oldest “last_searched” date/time and gets the data from that row. Also updates “last_searched” to current TIMESTAMP

6. Code creates a query out of the publications row data and sends it to the Twitter search API with results ordered by most recent tweets.

7. Code saves all returned tweets from the API in a new table called “tweets” Also checks to make sure it isn’t a duplicate tweet already in the table.

8. Steps 5-6 are repeated 400 times to keep API calls under the limit (check to make sure what the limit is).

9. Admin is prevented from running another search for 15 minutes. (Button greyed out? Says to wait? Maybe store the timestamp of the most recent search in the user table to regulate this?)

10. Most recent tweets from the “tweets” table that have an “approved” value of NULL are printed on the DOM.

11. Admin selects approved/disapproved buttons for each tweet.
“approved” values of tweets are updated to designated true/false values and removed from the DOM.

12. List is populated with new tweets as old ones are removed.

13. Admin can repeat steps 11-12 until there are no tweets with NULL  approved values.

# Pseudo Code (USER side)

1. User visits a url for a book on the U of M Press site.

2. Twitter widget checks the database “tweets” table for entries that match the publication_id and have an approved status of true.

3. Matching entries are converted to queries for Twitter’s embed API and the returned results are added as html elements inside the borders of the widget.**Possibly saved previously in Admin step 13**

4. Users can view/interact with the embedded tweets displayed on DOM.
