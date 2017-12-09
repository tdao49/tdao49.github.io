var topNavHeight = 0;
var hamburgerMenu = 'nav a:first-child';
var navSectionLinks = 'nav a:not(:first-child)';

var startColor = '#FC5B3F';
var endColor = '#9ec64d';
var circleProgressBar = 0;

$(document).ready(function() {


  skillBarAnimation();


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

  if( (windowTop <= sectionTop && windowBot >= sectionBot)
      ||  (windowBot >= sectionTop && windowBot <= sectionBot)
      || (windowTop >= sectionTop && windowTop <= sectionBot)
      || (windowMid >= sectionTop && windowMid <= sectionBot))
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

  // about animation
  if (sectionInView('about')) {
    addAnimation('about');
  }
  else{
    hiddenSection('about');
  }

  // skills animation
  if (sectionInView('skills')) {
      addAnimation('skills');
      if(circleProgressBar == 1)
      {
        skillBarAnimation();
        circleProgressBar = 0;
      }
  }
  else {
      circleProgressBar = 1;
      hiddenSection('skills');
      $("svg").remove();
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

  /* var homeDivHeight = $('#home').height() / 1.5; */
  var homeDivHeight = $('#home').height();
  var aboutDivHeight = $('#about').height() + homeDivHeight;
  var experienceDivHeight = $('#skills').height() + aboutDivHeight;
  var projectsDivHeight = $('#projects').height() + experienceDivHeight;
  var contactDivHeight = $('#contact').height() + projectsDivHeight;


  if (currentHeight < (homeDivHeight - topNavHeight)) {
    navBarCurrentSelection('home');
  } else if (currentHeight < (aboutDivHeight - topNavHeight)) {
    navBarCurrentSelection('about');
  } else if (currentHeight < (experienceDivHeight - topNavHeight)) {
    navBarCurrentSelection('skills');
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




function skillBarAnimation()
{
  var progressCircles =["html5-icon","css3-icon","python-icon","java-icon","cplusplus-icon","csharp-icon","javascript-icon","sql-icon",
                        "k2-icon", "visualStudio-icon", "sqlServer-icon", "eclipse-icon", "sharepoint-icon", "atom-icon", "androidStudio-icon", "aws-icon"];
  function createCircleProgress(divClass){
      var circle = new ProgressBar.Circle('#'+divClass, {
      color: startColor,
	    duration: 1400,
	    strokeWidth: 6,

	    step: function(state, circle) {
	        circle.path.setAttribute('stroke', state.color);
	    }
    });

    // This will get the number from the page
    var value = ($('#' + divClass).attr('value') / 100);
    var barColor = $('#' + divClass).attr('color');
    // This will determine the circumference of the circle
    circle.animate(value, {
	    from: {color: barColor},
	    to: {color: barColor}
 	  });
  }
  for(var i=0;i< progressCircles.length;i++){
     createCircleProgress(progressCircles[i]);
  }
};
