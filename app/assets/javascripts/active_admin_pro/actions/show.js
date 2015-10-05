// Enable dropdown for multiple actions on show pages.
$(document).on('ready page:load', function() {
  "use strict";

  $('body.show #titlebar_right').click(function() {
    $(this).toggleClass('active');
  });

  $('body.show #active_admin_content').click(function() {
    $('body.show #titlebar_right').removeClass('active');
  });
});
