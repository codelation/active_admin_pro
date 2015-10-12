// Highlight the label for a select field on focus.
App.ready(function() {
  "use strict";

  function activateSelectBehavior(selector) {
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

  $('.has_many_add').click(function() {
    setTimeout(function() {
      activateSelectBehavior('.has_many_fields:last .input.select');
    }, 0);
  });

  activateSelectBehavior('.input.select');
});
