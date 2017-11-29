var topNavHeight = 0;
var hamburgerMenu = 'nav a:first-child';
var navSectionLinks = 'nav a:not(:first-child)';

$(document).ready(function() {
  topNavHeight = $('nav').height();
  // onclick on the menu to navagation to different section of the page
  $(navSectionLinks).click(function() {

    var destinatePos = $($(this).attr('href')).offset().top;

    if ($(hamburgerMenu).css('display') == 'block') {
      $(navSectionLinks).removeAttr("style");
    }

    $('html, body').animate({
      scrollTop: destinatePos - topNavHeight
    }, 'slow');

    return false;
  });


  // When hamburger Menu got click. Open the section navigation drop down
  // notes: nav a:first-child == hamburger Menu

  $(hamburgerMenu).click(function() {
    if ($(navSectionLinks).css('display') == 'none') {
      $(navSectionLinks).css('display', 'block');
      $(hamburgerMenu).css('border-bottom', '1px solid');
    } else {
      $(navSectionLinks).removeAttr("style");
    }

  });



});

function sectionInView(secID)
{
  var windowTop = $(window).scrollTop() ;
  var windowBot = $(window).scrollTop() + window.innerHeight;
  var windowMid = (windowTop + windowBot)/ 2;

  // var sectionContentTop = $('#' + secID + ' .section-content').offset().top;
  // var sectionContentBot = sectionContentTop + $('#' + secID + ' .section-content').height();
  var sectionTop = $('#' + secID).offset().top;
  var sectionBot = sectionTop + $('#' + secID).height();
  var result = false;

  if( (windowTop > sectionTop && windowTop < sectionBot)
      ||  (windowBot > sectionTop && windowBot < sectionBot)
      || (windowMid > sectionTop && windowMid < sectionBot))
    {
      result = true;
    }
  return result;
}
function addSectionAnimation() {

  // home animation
  if (sectionInView('home')) {
    $('#home header #name').attr("class", "fade-in-from-bottom-delay");
    $('#home header #title').attr("class", "zoom-out");
  }
  else{
    $('#home header #name').attr("class", "hidden");
    $('#home header #title').attr("class", "hidden");
  }

  // background animation
  if (sectionInView('background')) {
    addAnimation('background');
  }
  else{
    hiddenSection('background');
  }

  // experiences animation
  if (sectionInView('experiences')) {
    addAnimation('experiences');
  }
  else {
      hiddenSection('experiences');
  }

  // projects animation
  if (sectionInView('projects')) {
    addAnimation('projects');
  }
  else {
      hiddenSection('projects');
  }

  // contact animation
  if (sectionInView('contact')) {
    addAnimation('contact');
  }
  else {
      hiddenSection('contact');
  }

}
$(window).scroll(function() {

  var currentHeight = $(this).scrollTop();

  var homeDivHeight = $('#home').height() / 1.5;
  var backgroundDivHeight = $('#background').height() + homeDivHeight;
  var experienceDivHeight = $('#experiences').height() + backgroundDivHeight;
  var projectsDivHeight = $('#projects').height() + experienceDivHeight;
  var contactDivHeight = $('#contact').height() + projectsDivHeight;


  if (currentHeight < (homeDivHeight - topNavHeight)) {
    navBarCurrentSelection('home');
  } else if (currentHeight < (backgroundDivHeight - topNavHeight)) {
    navBarCurrentSelection('background');
  } else if (currentHeight < (experienceDivHeight - topNavHeight)) {
    navBarCurrentSelection('experiences');
  } else if (currentHeight < (projectsDivHeight - topNavHeight)) {
    navBarCurrentSelection('projects');
  }else if (currentHeight < (contactDivHeight - topNavHeight)){
    navBarCurrentSelection('contact');
  }

  addSectionAnimation();


});



function addAnimation(secID) {
  $('#' + secID + ' header').attr("class", "fade-in-from-bottom");
  $('#' + secID + ' .section-content').attr("class", "fade-in section-content");
};

function hiddenSection(secID) {
  $('#' + secID + ' header').attr("class", "hidden");
  $('#' + secID + ' .section-content').attr("class", "hidden section-content");
};


function navBarCurrentSelection(divID) {
  $(navSectionLinks).removeClass();
  $('#' + divID + '-nav-bar').attr("class", "active-nav-bar");
};
