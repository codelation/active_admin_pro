// Activate any sortable columns. The gem on its own doesn't handle using Turbolinks.
// @see https://github.com/neo/activeadmin-sortable
App.ready(function() {
  "use strict";

  // Normally fired by $(document).ready
  $('.handle').closest('tbody').activeAdminSortable();
});
