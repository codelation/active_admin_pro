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
        }
      });

      wrapper.find('label').click(function() {
        summernoteInput.summernote('focus');
      });

      // Remove the default image upload form to avoid unpermitted params
      $('.note-image-dialog').remove();

      // Override the default image dialog with an Active Admin (jQuery UI) dialog
      var pictureButton = wrapper.find('button[data-original-title="Picture"]');
      pictureButton.unbind('click');
      pictureButton.click(function(event) {
        var dialogHtml = '<div id="summernote_image_dialog">';
        dialogHtml += '<div class="input file">';
        dialogHtml += '<label for="summernote_image_file">Upload Image</label>';
        dialogHtml += '<input id="summernote_image_file" type="file">';
        dialogHtml += '</div>';
        dialogHtml += '<div class="input text">';
        dialogHtml += '<label for="summernote_image_url">Image URL</label>';
        dialogHtml += '<input id="summernote_image_url" type="text">';
        dialogHtml += '</div>';
        dialogHtml += '</div>';
        $('#wrapper').prepend(dialogHtml);
        $('#summernote_image_dialog').dialog({
          autoOpen:    true,
          dialogClass: 'active_admin_dialog',
          modal:       true,
          title:       'Insert Image',

          buttons:  [{
            text: 'Insert Image',
            click: function() {
              var imageFile = $('#summernote_image_file')[0].files[0];
              var imageUrl = $('#summernote_image_url').val();
              var dialog = $(this);

              if (imageFile !== undefined) {
                var uploadButton = $('.ui-dialog-buttonpane button:first-of-type');
                uploadButton.text('Uploading...');
                uploadButton.prop('disabled', true);

                var data = new FormData();
                data.append('file', imageFile);

                $.ajax({
                  data:        data,
                  type:        "POST",
                  url:         "/admin/activeadmin_pro_summernote_images",
                  cache:       false,
                  contentType: false,
                  processData: false,

                  success: function(url) {
                    dialog.dialog('close').remove();
                    summernoteInput.summernote('insertImage', url, url.substring(url.lastIndexOf('/') + 1));
                  },

                  error: function(err) {
                    var json_err = jQuery.parseJSON(err.responseText)
                    $('#wrapper').prepend('<div class="flashes animate"><div class="flash flash_notice">' + json_err.error + '</div></div>');
                    $('.note-editor .modal-dialog .note-image-input').val('');
                  }
                });
                return;
              } else if (imageUrl.trim() !== '') {
                dialog.dialog('close').remove();
                summernoteInput.summernote('insertImage', imageUrl, imageUrl.substring(imageUrl.lastIndexOf('/') + 1));
                return;
              }

              dialog.dialog('close').remove();
            }
          }, {
            text: 'Cancel',
            click: function() {
              $(this).dialog('close').remove();
            }
          }]
        });

        return false;
      });
    });
  }

  activateBehavior();
});
