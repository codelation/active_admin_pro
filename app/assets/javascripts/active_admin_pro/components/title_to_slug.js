//= require slug
/* globals slug */

(function() {
  "use strict";

  App.register('component').enter(function() {
    var titleInput = $('.title-to-slug-title');
    var slugInput = $('.title-to-slug-slug');
    var titleAsSlug;

    titleInput.bind('propertychange change click keyup input paste', function() {
      titleAsSlug = slug(titleInput.val(), { lower: true });
      slugInput.val(titleAsSlug);
      slugInput.blur();
    });
  });
})();
