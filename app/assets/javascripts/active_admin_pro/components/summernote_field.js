//= require bootstrap
//= require codemirror
//= require codemirror/modes/css
//= require codemirror/modes/javascript
//= require codemirror/modes/xml
//= require codemirror/modes/htmlmixed
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
      codemirror: {
        lineNumbers: true,
        mode:        'htmlmixed'
      },
      height:     200,
      minHeight:  180,
      tabsize:    2,
      toolbar:    toolbar,

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
