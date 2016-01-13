//= require bootstrap
//= require codemirror
//= require codemirror/modes/css
//= require codemirror/modes/javascript
//= require codemirror/modes/xml
//= require codemirror/modes/htmlmixed
//= require summernote

// Summernote editor field.
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

  function activateBehavior() {
    $('.input.summernote').each(function() {
      var wrapper = $(this);
      var summernoteInput = wrapper.find('textarea').summernote({
        codemirror: {
          lineNumbers: true,
          mode:        'htmlmixed',
          theme:       'activeadmin_pro'
        },
        height:    200,
        minHeight: 180,
        tabsize:   2,
        toolbar:   toolbar,

        onBlur: function(e) {
          wrapper.removeClass('focused');
        },

        onFocus: function(e) {
          wrapper.addClass('focused');
        },

        onImageUpload: function(files) {
          var data = new FormData();
          data.append("file", files[0]);

          $.ajax({
            data:        data,
            type:        "POST",
            url:         "/admin/activeadmin_pro_summernote_images",
            cache:       false,
            contentType: false,
            processData: false,

            success: function(url) {
              var imageNode = document.createElement('img');
              imageNode.src = url;
              summernoteInput.summernote('insertNode', imageNode);
            },
            error: function(err) {
              var json_err = jQuery.parseJSON(err.responseText)
              $("#wrapper").prepend('<div class="flashes animate"><div class="flash flash_notice">' + json_err.error + '</div></div>');
              $(".note-editor .modal-dialog .note-image-input").val('');
            }
          });
        }
      });

      wrapper.find('label').click(function() {
        summernoteInput.summernote('focus');
      });
    });
  }

  activateBehavior();
});
