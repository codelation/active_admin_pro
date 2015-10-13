//= require bootstrap
//= require summernote

// Summer note editor field.
// @see http://summernote.org
App.ready(function() {
  "use strict";

  var toolbar = [
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['table', ['table']],
    ['insert', ['link', 'picture', 'video']],
    ['code', ['codeview', 'fullscreen']]
  ];

  $('.input.summernote').each(function() {
    var wrapper = $(this);
    var summernoteField = wrapper.find('textarea').summernote({
      height:  250,
      toolbar: toolbar,

      onBlur: function(e) {
        wrapper.removeClass('focused');
      },

      onFocus: function(e) {
        wrapper.addClass('focused');
      }
    });

    wrapper.find('label').click(function() {
      summernoteField.summernote('focus');
    });
  });
});
