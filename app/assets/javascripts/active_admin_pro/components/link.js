(function() {
  "use strict";

  var body, links;

  // Add active class on click to style while loading via turbolinks
  // and add loading class to the body element.
  App.register('component').enter(function() {
    body = $('body');
    links = $('a:not([data-method="delete"]):not([data-action="destroy"]):not(.has_many_add):not(.dropdown_menu_button):not([target="_blank"])');

    links.click(function() {
      body.addClass('loading');
      $(this).addClass('active');
    });
  }).exit(function() {
    // Remove loading and active classes on page unload
    body.removeClass('loading');
    links.removeClass('active');
  });
})();
