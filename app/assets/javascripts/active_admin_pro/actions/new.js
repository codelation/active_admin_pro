// Enable dropdown for multiple actions on show pages.
(function() {
  "use strict";

  App.register('component').enter(function() {
    setTimeout(function() {
      $('body.new #main_content form input:not([type="hidden"]):first').focus();
    }, 10);
  })
})();
