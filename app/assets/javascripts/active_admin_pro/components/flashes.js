// Add active class on click to style while loading via turbolinks.
$(document).on('ready page:load', function() {
  $('.flashes').addClass('animate');
});

$(document).on('page:before-change', function() {
  $('.flashes').removeClass('animate');
});
