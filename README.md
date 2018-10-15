# WebApp_Midterm_TwitterBot
Midterm Project for 10/16/18

The bot can search through the posts made since 2018 and get the Tweets with the keyword "NYU." You can define as many posts you want to search for as possible. In this example, I searched for 20 posts for demonstration.

Once the Tweets are filtered, the information will be stored in a file named tweetdata.json. From the data, the bot picks out the number of likes that the user has gotten, the ID of the post, and the screen name of the user.

If the user has gotten less than 100 likes in total, the bot will retweet the post and reply to the user with a message "I like your posts." It will console.log the user's screen name and two messages saying "retweeted" and "replied."

If the user has gotten more than 100 likes in total, the bot will console.log the user's screen name and a message saying that the user is "already popular."
