// Enable dropdown for multiple actions on show pages.
(function() {
  "use strict";

  App.register('component').enter(function() {
    $('body.show #titlebar_right').click(function() {
      $(this).toggleClass('active');
    });

    $('body.show #active_admin_content').click(function() {
      $('body.show #titlebar_right').removeClass('active');
    });
  });
})();
