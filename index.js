"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);


//fadi addded for database connection



Learn Node.Js   Getting Started With Node.js   Using MySQL with Node.js and the mysql JavaScript Client
Using MySQL with Node.js and the mysql JavaScript Client
January 17, 2018, By Jay Raj
NoSQL databases are all the rage these days, and probably the preferred back end for Node.js applications. But you shouldn’t architect your next project based on what’s hip and trendy. The type of database you use should depend on the project’s requirements. If your project involves dynamic table creation, real-time inserts etc. then NoSQL is the way to go. But on the other hand, if your project deals with complex queries and transactions, then an SQL database makes much more sense.

In this tutorial, we’ll have a look at getting started with the mysql module — a Node.js driver for MySQL, written in JavaScript. I’ll explain how to use the module to connect to a MySQL database, perform the usual CRUD operations, before examining stored procedures and escaping user input.
Ads by Hooly

This popular tutorial was updated in 2018. Changes include updates to ES6 syntax, addressing the fact that the node-mysql module was renamed, adding more beginner friendly instructions and adding a section on ORMs.

Quick Start: How to Use MySQL in Node
Maybe you’ve arrived here looking for a quick leg up. If you’re just after a way to get up and running with MySQL in Node in as little time as possible, we’ve got you covered!

Here’s how to use MySQL in Node in 5 easy steps:

Create a new project: mkdir mysql-test && cd mysql-test
Create a package.json file: npm init –y
Install the mysql module: npm install mysql –save
Create an app.js file and copy in the snippet below.
Run the file: node app.js. Observe a “Connected!” message.
//app.js

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database name'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
Installing the mysql Module
Now let’s take a closer look at each of those steps. First of all, we’re using the command line to create a new directory and navigate to it. Then we’re creating a package.json file using the command npm init –y. The -y flag means that npm will use only defaults and not prompt you for any options.

This step also assumes that you have Node and npm installed on your system. If this is not the case, then check out this SitePoint article to find out how to do that: Install Multiple Versions of Node.js using nvm.

After that, we’re installing the mysql module from npm and saving it as a project dependency. Project dependencies (as opposed to dev-dependencies) are those packages required for the application to run. You can read more about the differences between the two here.

mkdir mysql-test
cd mysql-test
npm install mysql -y
If you need further help using npm, then be sure to check out this guide, or ask in our forums.

Getting Started
Before we get on to connecting to a database, it’s important that you have MySQL installed and configured on your machine. If this is not the case, please consult the installation instructions on their home page.

The next thing we need to do is to create a database and a database table to work with. You can do this using a graphical interface, such as phpMyAdmin, or using the command line. For this article I’ll be using a database called sitepoint and a table called employees. Here’s a dump of the database, so that you can get up and running quickly, if you wish to follow along:

CREATE TABLE employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  location varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO employees (id, name, location) VALUES
(1, 'Jasmine', 'Australia'),
(2, 'Jay', 'India'),
(3, 'Jim', 'Germany'),
(4, 'Lesley', 'Scotland');
Using MySQL with Node.js & the mysql JavaScript Client

Connecting to the Database
Now, let’s create a file called app.js in our mysql-test directory and see how to connect to MySQL from Node.js.


Report Advertisement
// app.js
const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b0cb1ef1838d5e",
  password: "a26fe726",
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});


//



restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.queryResult&&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText.amount
      ? req.body.queryResult.parameters.echoText.amount
      : "Seems like some problem. Speak again and ask fadi.";
  return res.json({
   // speech: speech,
    //displayText: speech,
    fulfillmentText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/audio", function(req, res) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "music one":
      speech =
        '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music three":
      speech =
        '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music four":
      speech =
        '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music five":
      speech =
        '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
      break;
    case "delay":
      speech =
        '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
      break;
    //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "cardinal":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
    // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
      break;
  }
  return res.json({
   // speech: speech,
   // displayText: speech,
    fulfillmentText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

restService.post("/slack-test", function(req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    //fulfillmentText: speech;
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
