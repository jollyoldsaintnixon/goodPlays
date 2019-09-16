# goodPlays

goodPlays is loosely inspired by https://www.goodreads.com/
Link to goodPlays: https://goodplays-aa.herokuapp.com 

## Functionality

goodPlays allows users to browse from a library of video games and add or remove games to their game racks.  Games can be sorted by title, price, or release date, and they can be searched for through a combination of several filters.  Each game has a show page that give the user more information about the game.  

Users must be logged in to add or remove games from their rack.  They must also be logged in to leave a comment or reply and to rate a game.  Users can include a rating on any game with a top-level comment, but a rating is not necessarry.  Users can nullify a rating by toggling the 1st star if they change their mind about leaving a rating.

Email address structure is verified upon creation of an account.  A welcome letter is sent to that email address upon account creation.  

## Plans for future implementation

Moving forward, I would like to implement infinite scrolling and add social aspects akin to 'book clubs'.  I would also like to add in game developers as items that can be interacted with in a similar fashion as the games.  Users will be able to comment, rank, and share both games and developers.

## Technologies used

 * The backend was built with Ruby on Rails  
 * Backend views were rendered via jbuilder  
 * Embedded Ruby tags were used to augment the root html folder  
 * The front end was written in JavaScript mostly with the React and Redux libraries  
 * jQuery was used for its built-in authentication and for AJAX requests  
 * The presentation was designed with SCSS  
 * Each component could access the React's store through React Redux's Provider  
 * Each component had access to front-end routing features through React Router Dom  

## Highlighted Features

### Data Scraping

1. The data for goodPlays was parsed from a data set containing information about several thousand games on Steam.  JavaScript's open_uri library was used to parse the CSV into a table of desired information.  
  This data was then transefered into an array with each element as a hash that had keys corresponding to the desired attributes of each game.  For example, one element in the array would have a hash that stored keys to a title, release date, price and other chosen attributes.  Each hash had the same keys.
  Each hash in the array was stored into a text file its own line.  These lines, which contained all information to create a game, were read back line-by-line to seed the database.  
  The gem Mechanize was used to download and save jpegs from the image links scraped from the data.  These images were saved based on the corresponding game's title, and uploaded to an AWS seed bucket.  Each game was iterated over in order to attach link it with its image.  Games which did not successfully link with an image were discarded.  
  Around 500 games were chosen to seed the final app in order to avoid charges from AWS.

  Code snippets of this process:

    File.open("#{Rails.root}/lib/assets/scraped.txt", 'r') do |file|
      file.read.each_line do |line|
        Game.create(JSON.parse(line))
      end
    end

    agent = Mechanize.new
      games.each do |game, i| 
      agent.get(game.image_url).save('app/assets/images/icon_images/' + game.title + "_pic.jpg")
    end

    games.each do |game| 
      file = open("https://s3.amazonaws.com/goodplays-seeds/" + game.title.split.join('+') + "_pic.jpg")
      game.image.attach(io: file, filename: (game.id.to_s + ' ' + game.title + ' image.jpg'))
    end

### Searching

2. goodPlays has a robust search filter that can be accessed whether a user is logged in our not.  The user can choose to implement any combination of filters.  Available filters are string-to-title, release date range, price range, genres, and categories.  The number of matches against the total number of games in the library is displayed on the left-hand side of the screen and the matched games are shown in columns on the right.  The advanced search will not fire if no matches are found.
  A simple string-to-title search bar is fixe to the top of the screen on every front-end route.  Additionally, users can filter by a category or genre by selecting from the drop-down menu under the navigation bar's 'browse' link or by selecting from a particular game's genres and categories on it's show page.  If any of these filters do not match any game, the user is informed that no matches were found and is instead shown the entire library.
  
    Code snippet of the advanced search function:

    advancedGameList() {
    // destructure
      const { games } = this.props
      const { searchString, genres, categories, startDate, endDate, lowPrice, highPrice } = this.state
    // initialize
      let gamesList = []
    
      if (this.state === this.null) {
        return games
      }
 
      gamesList = stringFilter(games, searchString) // filter by string
      gamesList = genreFilter(gamesList, genres)
      gamesList = categoryFilter(gamesList, categories)
      gamesList = dateFilter(gamesList, startDate, endDate)
      gamesList = priceFilter(gamesList, parseFloat(lowPrice), parseFloat(highPrice))
 
      return gamesList
    }

## References and sources

* I pulled steam data from Craig Kelly's CSV found here: https://data.world/craigkelly/steam-game-data  

* I got a lot of tips from Stack Overflow, such as their method for randomly selecting an item from an array  

* The magnifying glass is labeled for free commercial use and was taken from www.freeiconshop.com  

* The background banner was created by user Jetrel and found at https://opengameart.org/content/castle-platformer under a Public Domain license  

* Favicon was designed at at https://pixlr.com/editor/ and created at https://favicon.io/favicon-converter/

* Spinner from https://www.npmjs.com/package/react-spinners

* User icon from http://simpleicon.com/user.html


TODO

CSS:
  SESSION FORM:
  COMMENTS: 

BACKEND:
  COUNT
    - necessary?

COMPONENTS:
  - Bloom filter for game recommendations
  PROFILE:
    - decorate comments
  SEARCH BAR:
    - can select with arrow keys
  INDEX: 
    - implement paginate 
  GAME COMMENTS:
    - can click on comment in user profile to go to that comment's location within the game show page. The issue now is sometimes the jump occurs before the comments all load, so the anchor is too high up
    - comments respect white space breaklines
    - make child rearing more efficient
    - make edit box close on submit after second edit
    - reply button renders when no user logged in
  SPLASH:
    - show game doesn't change after a few secs
  ADVANCED SEARCH:
    - if you come back to the index page after advanced searching, no long opens modal
    - add rating search
  RATINGS:
    - game renders appropriate stars
    - consider updating rating if deleting a rated comment
  INDEX: 
    - rethink the hovering boxes
  JUMP LINKS:
ERRORS:
  - Resolve the Mystery of the Sort by Rating.  Sometimes works properly, sometimes not.
