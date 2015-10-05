# Include Font Awesome in ActiveAdmin
ActiveAdmin.application.register_stylesheet "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"

# Add Apple web application icons
base_url = "//s3.amazonaws.com/codelation.activeadmin/apple-touch-icon"
sizes = [76, 120, 152, 167, 180]
ActiveAdmin.application.register_stylesheet "#{base_url}.png", media: nil, rel: "apple-touch-icon"
sizes.each do |size|
  ActiveAdmin.application.register_stylesheet(
    "#{base_url}-#{size}x#{size}.png",
    media: nil,
    rel:   "apple-touch-icon",
    sizes: "#{size}x#{size}"
  )
end

# Add the meta tags to enable Active Admin as an iOS home screen app
ActiveAdmin.application.meta_tags ||= {}
ActiveAdmin.application.meta_tags["apple-mobile-web-app-capable"] ||= "yes"
ActiveAdmin.application.meta_tags["apple-mobile-web-app-title"]   ||= "Admin"
ActiveAdmin.application.meta_tags["viewport"]                     ||= "width=device-width, initial-scale=1.0"
