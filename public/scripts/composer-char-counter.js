$(document).ready(function(event) {
  $('textarea').on('keypress', function() {
    var counter = (139 - ($('textarea').val().length));
    // $(".counter").text(counter);
    console.log($(this))
    $(this).find(".counter").text(counter);
    if (counter < 0) {
      $(".counter").css('color', 'red');
    }

  });
})

