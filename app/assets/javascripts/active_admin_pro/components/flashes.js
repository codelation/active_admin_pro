// Add active class on click to style while loading via turbolinks.
App.ready(function() {
  "use strict";

  $('.flashes').addClass('animate');
  $(document).on('page:before-change', function() {
    $('.flashes').removeClass('animate');
  });
});
