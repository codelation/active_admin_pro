//= require intl-tel-input
//= require intl-tel-utils

(function() {
  "use strict";

  function activateBehavior() {
    $('.input.phone').each(function() {
      var container = $(this);
      var input = container.find('input');
      var label = container.find('label');

      // Set the container's class when the input field receives focus.
      input.focus(function() {
        container.addClass('focused');
      });

      // Set the container class based on whether or not the
      // input field has a value and remove the focused class.
      function setContainerCssClass() {
        if (input.val().replace('+', '').trim() === '' ) {
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

    $('.input.phone input[type="text"]').intlTelInput({
      preferredCountries: ['us'],
      responsiveDropdown: true
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
