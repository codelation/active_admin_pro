App.ready(function() {
  "use strict";
  var links = $('a:not([data-method="delete"]):not(.has_many_add):not(.dropdown_menu_button):not([target="_blank"])');

  // Add active class on click to style while loading via turbolinks.
  links.click(function() {
    var link = $(this);
    link.addClass('active');
  });

  // Remove active class on page load
  links.removeClass('active');
});
