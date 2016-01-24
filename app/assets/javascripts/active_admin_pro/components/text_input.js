// This is a Google Material Design inspired text field.
// The JavaScript doesn't do much. It just set the classes needed
// by the CSS based on the input's focus and blank/filled states.
(function() {
  "use strict";

  function activateBehavior() {
    $('.input.stringish:not(.phone):not(.filter_form_field), .input.text:not(.filter_form_field)').each(function() {
      var container = $(this);
      var input = container.find('input, textarea');
      var label = container.find('label');

      // Set the container's class when the input field receives focus.
      input.focus(function() {
        container.addClass('focused');
      });

      // Set the container class based on whether or not the
      // input field has a value and remove the focused class.
      function setContainerCssClass() {
        if (input.val().trim() === '') {
          container.removeClass('has-value');
          container.addClass('blank');
        } else {
          container.removeClass('blank');
          container.addClass('has-value');
        }
      }

      input.blur(function() {
        setContainerCssClass();
        container.removeClass('focused');
      });

      setContainerCssClass();
      container.addClass('animate');
    });
  }

  App.register('component').enter(function() {
    activateBehavior();
    $('.has_many_add').click(function() {
      setTimeout(function() {
        activateBehavior();
      }, 0);
    });
  });
})();
