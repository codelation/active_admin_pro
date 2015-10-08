# Include Font Awesome in ActiveAdmin
config = ActiveAdmin.application
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
config.meta_tags["viewport"]                     ||= "width=device-width, initial-scale=1.0"
