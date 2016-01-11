App.ready(function() {
  "use strict";
  var body = $('body');
  var links = $('a:not([data-method="delete"]):not([data-action="destroy"]):not(.has_many_add):not(.dropdown_menu_button):not([target="_blank"])');

  // Add active class on click to style while loading via turbolinks
  // and add loading class to the body element.
  links.click(function() {
    body.addClass('loading');
    $(this).addClass('active');
  });

  // Remove loading and active classes on page load
  body.removeClass('loading');
  links.removeClass('active');

  // We also need to make sure to remove the loading classes when the
  // page is restored by Turbolinks when using the back button
  document.addEventListener('page:restore', function() {
    body.removeClass('loading');
    links.removeClass('active');
  });
});
