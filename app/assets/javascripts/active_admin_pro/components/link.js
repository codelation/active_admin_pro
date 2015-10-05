// Add active class on click to style while loading via turbolinks.
var linksSelector = 'a:not([data-method="delete"]):not(.dropdown_menu_button):not([target="_blank"])';
$(document).on('ready page:load', function() {
  "use strict";

  $(linksSelector).click(function() {
    var link = $(this);
    link.addClass('active');
  });
});

$(document).on('page:change', function() {
  $(linksSelector).removeClass('active');
});
