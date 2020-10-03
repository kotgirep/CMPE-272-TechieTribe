Usage:
-----
- Application to programatically consume twitter APIs

Technologies: 
-------------
- NodeJs, Express framework

Application Insights:
---------------------
1. This is NodeJs-Express application


How to use:
--------------------------
1. Clone the Repo
2. Set Twitter authentication keys in below process.env variables. [Reference](https://stackoverflow.com/a/13333312)
```
process.env.TWITTER_CONSUMER_KEY
process.env.TWITTER_CONSUMER_SECRET
process.env.TWITTER_ACCESS_TOKEN_KEY
process.env.TWITTER_ACCESS_TOKEN_SECRET
```

An alternate way to set these variables: create a .env file in the project folder and set values as given below
```
TWITTER_CONSUMER_KEY=XXXXXXXXXXXXXX
TWITTER_CONSUMER_SECRET=XXXXXXXXXXXXXX
TWITTER_ACCESS_TOKEN_KEY=XXXXXXXXXXXXXX
TWITTER_ACCESS_TOKEN_SECRET=XXXXXXXXXXXXXX
```

3. Run below command to install the dependencies in the local node_modules folder.
```
$ npm install
```
4. Run below command to start server.
```
$ npm run
```


Team members:
-------------
1. Bhavya Tetali, 
2. Pranjali Kotgire, 
3. Priti Sharma, 
4. Supriya Meduri
