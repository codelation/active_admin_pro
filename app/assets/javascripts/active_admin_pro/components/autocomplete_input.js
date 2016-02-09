//= require awesomplete
//= require jquery.scrollTo

/* globals Awesomplete */
(function() {
  "use strict";

  // Enable auto-complete input fields.
  // @see http://leaverou.github.io/awesomplete/
  App.register('component').enter(function() {
    $('input.autocomplete').each(function() {
      var autocomplete = new Awesomplete(this, { maxItems: 9999 });

      var input = $(this);
      var list = $(input.siblings('ul'));
      list.css('width', input.outerWidth());

      // Open the auto complete list when the input is focused
      input.focus(function() {
        autocomplete.evaluate();
        autocomplete.open();
      });

      // Scroll list to top when opened
      input.bind('awesomplete-open', function() {
        list.scrollTo(0);
      });

      // Scroll list up or down to the selected element
      input.bind('awesomplete-highlight', function(e) {
        var item = $(list.find('li[aria-selected="true"]'));
        if (item === undefined || item === null || item.position() === undefined) { return; }

        // Gather the list and item heights so we can scroll to the item
        var itemHeight = item.height();
        var itemTop = item.position().top;
        var listHeight = list.height();
        var itemCount = listHeight / itemHeight;

        // Scroll the item to the bottom or top of the list if not visible
        if (itemTop >= listHeight) {
          list.scrollTo(item, {
            offset: {
              top: -itemHeight * (itemCount - 1)
            }
          });
        } else if (itemTop < 0) {
          list.scrollTo(item);
        }
      });
    });
  });
})();
