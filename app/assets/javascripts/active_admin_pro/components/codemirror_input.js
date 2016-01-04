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

// CodeMirror editor field.
// @see https://codemirror.net
App.ready(function() {
  "use strict";

  var codemirrorInputs, windowElement;

  function activateBehavior() {
    codemirrorInputs = $('.input.codemirror');
    windowElement = $(window);

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

      codemirrorInput.on('focus', function() {
        wrapper.addClass('focused');
      });

      codemirrorInput.on('blur', function() {
        wrapper.removeClass('focused');
      });
    });

    resizeCodemirrorInputs();
    windowElement.resize(resizeCodemirrorInputs);
  }

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

  $('.has_many_add').click(function() {
    setTimeout(function() {
      activateBehavior();
    }, 0);
  });

  activateBehavior();
});
