$(document).ready(function(event) {
  $('textarea').on('input', function() {
    var charactersRemaining = (140 - ($('textarea').val().length));
    var $counter = $(this).parent().find('.counter');
    $counter.text(charactersRemaining);
    if (charactersRemaining < 0) {
      $counter.css({color: 'red'});
    } else {
      $counter.css({color: 'black'});
    }
  });
})
