ActiveAdmin.application.tap do |config|
  # Set the default configuration for authenticating with admin users
  config.authentication_method = :authenticate_admin_user!
  config.current_user_method   = :current_admin_user
  config.logout_link_method    = :delete
  config.logout_link_path      = :destroy_admin_user_session_path

  # Prefer short date and time format
  config.localize_format = :short

  # Add the meta tags to enable Active Admin as an iOS home screen app
  config.meta_tags ||= {}
  config.meta_tags["apple-mobile-web-app-capable"] ||= "yes"
  config.meta_tags["apple-mobile-web-app-title"]   ||= "Admin"
  config.meta_tags["viewport"]                     ||= "initial-scale=1, maximum-scale=1, width=device-width"

  # Add route and controller for Summernote's image uploads
  config.load_paths.unshift File.join(File.expand_path("../../..", __FILE__), "lib", "active_admin_pro", "summernote_image")
end
