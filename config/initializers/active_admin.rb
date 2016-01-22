ActiveAdmin.application.tap do |config|
  # Set the default configuration for authenticating with admin users
  config.authentication_method = :authenticate_admin_user!
  config.current_user_method   = :current_admin_user
  config.logout_link_method    = :delete
  config.logout_link_path      = :destroy_admin_user_session_path

  # Prefer short date and time format
  config.localize_format = :short

  # Include Font Awesome in ActiveAdmin
  config.register_stylesheet "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"

  # Add Apple web application icons
  base_url = "//s3.amazonaws.com/codelation.activeadmin/apple-touch-icon"
  sizes = [76, 120, 152, 167, 180]
  config.register_stylesheet "#{base_url}.png", media: nil, rel: "apple-touch-icon"
  sizes.each do |size|
    config.register_stylesheet(
      "#{base_url}-#{size}x#{size}.png",
      media: nil,
      rel:   "apple-touch-icon",
      sizes: "#{size}x#{size}"
    )
  end

  # Add the meta tags to enable Active Admin as an iOS home screen app
  config.meta_tags ||= {}
  config.meta_tags["apple-mobile-web-app-capable"] ||= "yes"
  config.meta_tags["apple-mobile-web-app-title"]   ||= "Admin"
  config.meta_tags["viewport"]                     ||= "initial-scale=1, maximum-scale=1, width=device-width"

  # Add route and controller for Summernote's image uploads
  config.load_paths.unshift File.join(File.expand_path("../../..", __FILE__), "lib", "activeadmin_pro", "summernote_image")
end
