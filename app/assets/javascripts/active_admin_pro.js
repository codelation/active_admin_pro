/* globals Turbolinks */
//= require active_admin/base
//= require turbolinks
//= require_self
//= require_tree ./active_admin_pro

// The app is fully ready for enabling transition cache,
// but I can't quite prevent all elements from flashing on load.
// Turbolinks.enableTransitionCache();
Turbolinks.enableProgressBar();

// I was struggling to get everything to fire off every page load,
// but only once per page load, so I came up with crap.
//
// Usage:
//
//   App.ready(function() {
//     console.log('This will be called once after every page load.');
//   });
if (window.App === undefined) {
  window.App = {
    initialized:  false,
    initializers: []
  };
}

App.ready = function(readyFunction) {
  if (!App.initialized) {
    App.initializers.push(readyFunction);
  }
};

if (!App.initialized) {
  $(document).on('ready page:load', function() {
    $.each(App.initializers, function(index, initializer) {
      initializer();
    });
    App.initialized = true;
  });
}
