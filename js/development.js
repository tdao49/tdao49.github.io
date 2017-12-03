

$(document).ready(function() {

  $('.navigation').click(function() {

    var destinationPos = $($(this).attr('href')).offset().top;

    $('html, body').animate({
      scrollTop: destinationPos
    }, 'slow');
    return false;
  });
});
