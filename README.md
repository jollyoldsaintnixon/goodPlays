# README

goodPlays is loosely inspired by https://www.goodreads.com/

Technologies used:
  I used javascript's open_uri library to parse a large csv data set scraped from 


I pulled steam data from Craig Kelly's CSV found here: https://data.world/craigkelly/steam-game-data

I got a lot of tips from Stack Overflow, such as their method for randomly selecting an item from an array.

The magnifying glass is labeled for free commercial use and was taken from www.freeiconshop.com

I followed Kate Lawrence's walkthrough (https://medium.com/@k88lawrence/dead-simple-infinite-scroll-with-kaminari-and-react-waypoint-8073c22be7ed) for implementing infinite scrolling 

The background banner was created by user Jetrel and found at https://opengameart.org/content/castle-platformer under a Public Domain license

Link to site: https://goodplays-aa.herokuapp.com

TODO:
  CSS:
    show page looks like goodreads
  Componenets:
    Nav Options:
      dropdown menu disappears when mouseOut
    Regular Search 
      Add scroll bar to search drop down menu
      Search bar dropdown menu disappears after submission and loss of focus 
    Advanced search form
      developer selection and functionality
      Add 'free' option to price
    Profile:
      Make public/private option
      Add reshuffle to recommendations
    Splash:
      clean up code
        consider making a container
    Index:
      Get Paginate working
  Reducers:
    Figure out how to deal with game rack errors
  Controllers:
    Implement caching
  Other:
    Put text file with game seed data on AWS and take off of app

