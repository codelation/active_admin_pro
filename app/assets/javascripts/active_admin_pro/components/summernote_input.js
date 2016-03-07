//= require bootstrap
//= require codemirror
//= require codemirror/modes/css
//= require codemirror/modes/javascript
//= require codemirror/modes/xml
//= require codemirror/modes/htmlmixed
//= require summernote

// Summernote editor field.
// @see http://summernote.org
(function() {
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
  
  function insertImage(imageUrl, imageLink, summernoteInput) {
    var link = document.createElement('a');
    var img = document.createElement('img');
    var insertedImage;
    if(imageLink !== "") {
      link.setAttribute("href", imageLink);
      img.setAttribute("src", imageUrl);
      link.appendChild(img);
      insertedImage = link;
    } else {
      img.setAttribute("src", imageUrl);
      insertedImage = img;
    }
    summernoteInput.summernote('insertNode', insertedImage);
  }

  function activateBehavior() {
    $('.input.summernote').each(function() {
      var wrapper = $(this);
      var textarea = wrapper.find('textarea');

      // Default Summernote options
      var summernoteOptions = {
        codemirror: {
          lineNumbers: true,
          mode:        'htmlmixed',
          theme:       'active_admin_pro'
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
      };

      // Merge options given by the Active Admin input option `:summernote`
      $.extend(summernoteOptions, textarea.data('summernote-options'));

      // Initialize the Summernote editor
      var summernoteInput = textarea.summernote(summernoteOptions);

      wrapper.find('label').click(function() {
        summernoteInput.summernote('focus');
      });

      // Remove the default image upload form to avoid unpermitted params
      $('.note-image-dialog').remove();

      // Override the default image dialog with an Active Admin (jQuery UI) dialog
      var pictureButton = wrapper.find('button[data-original-title="Picture"]');
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
        dialogHtml += '<div class="input text">';
        dialogHtml += '<label for="summernote_image_link">Image Link</label>';
        dialogHtml += '<input id="summernote_image_link" type="text">';
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
              var imageLink = $('#summernote_image_link').val();
              var dialog = $(this);

              if (imageFile !== undefined) {
                var uploadButton = $('.ui-dialog-buttonpane button:first-of-type');
                uploadButton.text('Uploading...');
                uploadButton.prop('disabled', true);

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
                    dialog.dialog('close').remove();
                    insertImage(url, imageLink, summernoteInput);
                  },

                  error: function(err) {
                    var json_err = jQuery.parseJSON(err.responseText);
                    $('#wrapper').prepend('<div class="flashes animate"><div class="flash flash_notice">' + json_err.error + '</div></div>');
                    $('.note-editor .modal-dialog .note-image-input').val('');
                  }
                });
                return;
              } else if (imageUrl.trim() !== '') {
                dialog.dialog('close').remove();
                insertImage(imageUrl, imageLink, summernoteInput);
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

  App.register('component').enter(function() {
    activateBehavior();
  });
})();
