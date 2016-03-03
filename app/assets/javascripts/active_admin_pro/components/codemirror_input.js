//= require codemirror
//= require codemirror/addons/edit/closebrackets
//= require codemirror/addons/edit/closetag
//= require codemirror/addons/edit/continuelist
//= require codemirror/addons/edit/matchbrackets
//= require codemirror/addons/edit/matchtags
//= require codemirror/addons/fold/xml-fold
//= require codemirror/addons/mode/loadmode
//= require codemirror/addons/mode/multiplex
//= require codemirror/addons/mode/overlay
//= require codemirror/addons/mode/simple
//= require codemirror/addons/search/search
//= require codemirror/modes/coffeescript
//= require codemirror/modes/css
//= require codemirror/modes/diff
//= require codemirror/modes/dockerfile
//= require codemirror/modes/gfm
//= require codemirror/modes/go
//= require codemirror/modes/haml
//= require codemirror/modes/handlebars
//= require codemirror/modes/htmlembedded
//= require codemirror/modes/htmlmixed
//= require codemirror/modes/javascript
//= require codemirror/modes/markdown
//= require codemirror/modes/nginx
//= require codemirror/modes/php
//= require codemirror/modes/python
//= require codemirror/modes/ruby
//= require codemirror/modes/rust
//= require codemirror/modes/sass
//= require codemirror/modes/shell
//= require codemirror/modes/xml
//= require codemirror/modes/yaml

/* globals CodeMirror */

var globalEditor;

// CodeMirror editor field.
// @see https://codemirror.net
(function() {
  "use strict";

  function uploadAndInsertImage(editor, position, imageFile, callback) {
    var fileName = imageFile.name;

    // Add temporary uploading message
    var uploadingMessage = '![Uploading ' + fileName + '…]()';
    editor.doc.setSelection(position);
    editor.doc.replaceSelection(uploadingMessage);

    // Upload the file using the image upload ability from the Summernote editor
    var data = new FormData();
    data.append('file', imageFile);

    $.ajax({
      data:        data,
      type:        'POST',
      url:         '/admin/active_admin_pro_summernote_images',
      cache:       false,
      contentType: false,
      processData: false,

      success: function(url) {
        editor.doc.setSelection(position, { line: position.line, ch: position.ch + uploadingMessage.length });
        editor.doc.replaceSelection('![' + fileName + '](' + url + ')');
      },

      error: function(err) {
        var json_err = jQuery.parseJSON(err.responseText);
        $('#wrapper').prepend('<div class="flashes animate"><div class="flash flash_notice">' + json_err.error + '</div></div>');
        $('.note-editor .modal-dialog .note-image-input').val('');
      },

      complete: function() {
        callback.call();
      }
    });
  }

  App.register('component').enter(function() {
    var codemirrorInputs = $('.input.codemirror');
    var windowElement = $(window);

    codemirrorInputs.each(function() {
      var wrapper = $(this);
      var textarea = wrapper.find('textarea');
      var codemirrorOptions = textarea.data('codemirror');

      // By default, use spaces instead of tabs
      if (typeof(codemirrorOptions.extraKeys.Tab) !== 'function') {
        codemirrorOptions.extraKeys.Tab = function(cm) {
          var spaces = new Array(cm.getOption('indentUnit') + 1).join(' ');
          cm.replaceSelection(spaces);
        };
      }

      // Initialize the Code Mirror editor with the given options
      var codemirrorInput = CodeMirror.fromTextArea(textarea[0], codemirrorOptions);

      wrapper.find('label').click(function() {
        codemirrorInput.focus();
      });

      codemirrorInput.on('blur', function() {
        wrapper.removeClass('focused');
      });

      codemirrorInput.on('drop', function(editor, event) {
        globalEditor = editor;
        var position = editor.coordsChar({ left: event.pageX, top: event.pageY });
        var file = event.dataTransfer.files[0];

        editor.setOption('readOnly', true);
        uploadAndInsertImage(editor, position, file, function() {
          editor.setOption('readOnly', false);
        });
      });

      codemirrorInput.on('focus', function() {
        wrapper.addClass('focused');
      });
    });

    // Code Mirror works best when there is a fixed width on its container, so
    // let's detect the size the container is without the input and set the width.
    function resizeCodemirrorInputs() {
      codemirrorInputs.each(function() {
        var wrapper = $(this);
        wrapper.hide();
        wrapper.css('width', wrapper.parent().innerWidth() + 'px');
        wrapper.show();
      });
    }

    resizeCodemirrorInputs();
    windowElement.resize(resizeCodemirrorInputs);
  });
})();
