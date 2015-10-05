// Enable dropdown for multiple actions on show pages.
$(document).on('ready page:load', function() {
  "use strict";

  setTimeout(function() {
    $('body.new #main_content form input:not([type="hidden"]):first').focus();
  }, 10);
});
