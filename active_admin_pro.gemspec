$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "active_admin_pro/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "active_admin_pro"
  s.version     = ActiveAdminPro::VERSION
  s.authors     = ["Brian Pattison"]
  s.email       = ["brian@brianpattison.com"]
  s.homepage    = "https://github.com/codelation/active_admin_pro"
  s.summary     = "Active Admin add-ons"
  s.description = "A collection of styles and scripts that make Active Admin better."
  s.licenses    = ["MIT"]

  s.files = Dir["{app,config,lib,vendor}/**/*", "LICENSE", "Rakefile", "README.md"]
  s.test_files = Dir["spec/**/*"]

  s.add_dependency "activeadmin"
  s.add_dependency "activeadmin-sortable", "~> 0.0"
  s.add_dependency "fog", "~> 1.34"
  s.add_dependency "turbolinks", "~> 2.5"

  s.add_development_dependency "awesome_print", "~> 1.6"
  s.add_development_dependency "capybara", "~> 2.5"
  s.add_development_dependency "database_cleaner", "~> 1.5"
  s.add_development_dependency "dotenv-rails", "~> 2.0"
  s.add_development_dependency "factory_girl_rails", "~> 4.5"
  s.add_development_dependency "foreman", "~> 0.78"
  s.add_development_dependency "guard", "~> 2.13"
  s.add_development_dependency "guard-rspec", "~> 4.2"
  s.add_development_dependency "puma", "~> 2.14"
  s.add_development_dependency "quiet_assets", "~> 1.1"
  s.add_development_dependency "rake", "~> 10.4"
  s.add_development_dependency "rb-fsevent", "~> 0.9"
  s.add_development_dependency "rspec-rails", "~> 3.3"
  s.add_development_dependency "sqlite3", "~> 1.3"
  s.add_development_dependency "terminal-notifier-guard", "~> 1.6"
end
