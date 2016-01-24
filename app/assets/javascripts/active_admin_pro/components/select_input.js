// Highlight the label for a select field on focus.
(function() {
  "use strict";

  function activateBehavior(selector) {
    $(selector).each(function() {
      var container = $(this);
      var input = container.find('select');
      var label = container.find('label');

      // Set the container's class when the input field receives focus.
      input.focus(function() {
        container.addClass('focused');
      });

      input.blur(function() {
        container.removeClass('focused');
      });
    });
  }

  App.register('component').enter(function() {
    activateBehavior('.input.country:not(.filter_form_field)');
    activateBehavior('.input.select:not(.filter_form_field)');

    $('.has_many_add').click(function() {
      setTimeout(function() {
        activateBehavior('.has_many_fields:last .input.country');
        activateBehavior('.has_many_fields:last .input.select');
      }, 0);
    });
  });
})();
