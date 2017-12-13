/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  function createTweetElement (tweetData) {
    var $tweeting = $('<article>').addClass('tweet');
    var $img = $('<img>').addClass('profile').attr('src',tweetData.user.avatars.small);
    var $name = $('<h2>').text(tweetData.user.name);
    var $handle = $('<p>').text(tweetData.user.handle);
    var $header = $('<div>').addClass('header');
    $header.append($img,$name,$handle);
    var $content = $('<p>').text(tweetData.content.text);
    var $icon1 = $('<img>').addClass('icon').attr('src', 'https://image.flaticon.com/icons/svg/60/60993.svg');
    var $icon2 = $('<img>').addClass('icon').attr('src', 'https://image.freepik.com/free-icon/retweet-arrows-symbol_318-41844.jpg');
    var $icon3 = $('<img>').addClass('icon').attr('src', 'https://cdn1.iconfinder.com/data/icons/mini-solid-icons-vol-2/16/94-512.png');
    var $time = $('<p>').text(tweetData.created_at);
    var $footer = $('<div>').addClass('footer');
    $footer.append($time,$icon1,$icon2,$icon3);
    $tweeting.append($header,$content,$footer);
    return $tweeting;
  }

  function renderTweets(tweets) {
    // loops through tweets
    $('.all-tweets').empty();
    for (var i in tweets.reverse()) {
      // calls createTweetElement for each tweet
      var $tweet = createTweetElement(tweets[i]);
      // takes return value and appends it to the tweets container
      $('.all-tweets').append(createTweetElement(tweets[i]));
    }
  }

  function loadTweets(dataBase) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).done(renderTweets);
  }

  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log($('form').serialize());
    loadTweets('../server/data-files/initial-tweets.json');
  });

})



var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



