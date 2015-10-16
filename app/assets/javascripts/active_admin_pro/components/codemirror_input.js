//= require codemirror
//= require codemirror/modes/css
//= require codemirror/modes/javascript
//= require codemirror/modes/xml
//= require codemirror/modes/htmlmixed

// CodeMirror editor field.
// @see https://codemirror.net
App.ready(function() {
  "use strict";

  $('.input.codemirror').each(function() {
    var wrapper = $(this);
    var mode = wrapper.data('mode');
    var textarea = wrapper.find('textarea')[0];

    // Initialize the Code Mirror editor with the given options
    var codemirrorInput = CodeMirror.fromTextArea(textarea, {
      mode: mode
    });

    wrapper.find('label').click(function() {
      codemirrorInput.focus();
    });

    codemirrorInput.on('focus', function() {
      wrapper.addClass('focused');
    });

    codemirrorInput.on('blur', function() {
      wrapper.removeClass('focused');
    });
  });
});
