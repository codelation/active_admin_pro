//= require moment
//= require pikaday

// Enable Pikaday date picker fields
// @see https://github.com/dbushell/Pikaday
App.ready(function() {
  "use strict";

  $('.pikaday').each(function() {
    new Pikaday({
      bound:  false,
      field:  this,
      format: 'YYYY-MM-DD HH:mm:ss ZZ'
    });
  });

  $('.has_many_add').click(function() {
    setTimeout(function() {
      $('.has_many_fields:last .pikaday').each(function() {
        new Pikaday({
          bound:  false,
          field:  this,
          format: 'YYYY-MM-DD HH:mm:ss ZZ'
        });
      });
    }, 0);
  });
});
