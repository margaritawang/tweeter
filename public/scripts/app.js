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
    var $icons = $('<div>')
    var $icon1 = $('<img>').addClass('icon').attr('src', 'https://image.flaticon.com/icons/svg/60/60993.svg');
    var $icon2 = $('<img>').addClass('icon').attr('src', 'https://image.freepik.com/free-icon/retweet-arrows-symbol_318-41844.jpg');
    var $icon3 = $('<img>').addClass('icon').attr('src', 'https://cdn1.iconfinder.com/data/icons/mini-solid-icons-vol-2/16/94-512.png');
    var $time = $('<p>').text(tweetData.created_at);
    var $footer = $('<div>').addClass('footer');
    $icons.append($icon1,$icon2,$icon3);
    $footer.append($time,$icons);
    $tweeting.append($header,$content,$footer);
    return $tweeting;
  }

  function renderTweets(tweets) {
    // loops through tweets
    $('.all-tweets').empty();
    for (var i in tweets) {
      // calls createTweetElement for each tweet
      var $tweet = createTweetElement(tweets[i]);
      // takes return value and appends it to the tweets container
      $('.all-tweets').prepend($tweet);
    }
  }

  function postTweets(tweet) {
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: tweet
    }).done(function() {
      loadTweets();
      $('form')[0].reset();
    });
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).done(renderTweets);
  }


  $('form').on('submit', function(event) {
    event.preventDefault();
    // console.log("am i running")
    if ($('textarea').val().length > 140) {
      alert('Your word count is greater than 140!');
    } else if ($('textarea').val().length === 0) {
      alert('please fill in the form');
    } else {
      postTweets($(this).serialize());
      $('.counter').text('140');
    }

  });

  loadTweets();

  $('button').on('click', function() {
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  })



})

