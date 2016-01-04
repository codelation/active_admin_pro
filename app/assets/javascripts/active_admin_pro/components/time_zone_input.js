// Creates a select input populated with time zones and automatically
// selects the current time zone detected by the browser.
App.ready(function() {
  "use strict";

  var offset, option, select;

  function activateBehavior() {
    $('.input.time_zone select').each(function() {
      select = $(this);
      if (select.val().trim() === '') {
        option = select.find('.time-zone' + timeOffset());
        select.val(option.val());
      }
    });
  }

  // Get the offset from the browser without having to account for DST.
  function timeOffset() {
    if (offset) {
      return offset;
    }

    var dtDate = new Date('1/1/' + (new Date()).getUTCFullYear()),
        intOffset = 10000.0, // Set initial offset high so it is adjusted on the first attempt
        intMonth;

    // Go through each month to find the lowest offset to account for DST
    for (intMonth = 0; intMonth < 12; intMonth++) {
      // Go to the next month
      dtDate.setUTCMonth(dtDate.getUTCMonth() + 1);

      // To ignore daylight saving time look for the lowest offset.
      // Since, during DST, the clock moves forward, it'll be a bigger number.
      if (intOffset > (dtDate.getTimezoneOffset() * (-1.0))) {
        intOffset = (dtDate.getTimezoneOffset() * (-1.0));
      }
    }

    offset = intOffset / 60; // offset in hours
    return offset;
  }

  $('.has_many_add').click(function() {
    setTimeout(function() {
      activateBehavior();
    }, 0);
  });

  activateBehavior();
});
