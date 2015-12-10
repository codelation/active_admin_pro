//= require intl-tel-input
//= require intl-tel-utils

App.ready(function() {
  "use strict";

  function activateBehavior() {
    $('.input.phone input[type="text"]').intlTelInput({
      autoPlaceholder: false,
      defaultCountry:  'us'
    });
  }

  $('.has_many_add').click(function() {
    setTimeout(function() {
      activateBehavior();
    }, 0);
  });

  activateBehavior();
});
