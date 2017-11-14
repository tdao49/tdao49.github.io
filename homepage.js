var topNavHeight = 0;
var hamburgerMenu = 'nav a:first-child';
var navSectionLinks = 'nav a:not(:first-child)';

$(document).ready(function(){
  topNavHeight = $('nav').height();
  // onclick on the menu to navagation to different section of the page
  $(navSectionLinks).click(function(){

      var destinatePos = $($(this).attr('href')).offset().top;

      if($(hamburgerMenu).css('display') == 'block'){
         $(navSectionLinks).removeAttr("style");
      }

        $('html, body').animate({
          scrollTop: destinatePos - topNavHeight
        }, 'slow');

    return false;
  });


  // When hamburger Menu got click. Open the section navigation drop down
  // notes: nav a:first-child == hamburger Menu

  $(hamburgerMenu).click(function(){
      if($(navSectionLinks).css('display') == 'none')
      {
          $(navSectionLinks).css('display', 'block');
          $(hamburgerMenu).css('border-bottom', '1px solid');
      }
      else
      {
          $(navSectionLinks).removeAttr("style");
      }

    });
});
