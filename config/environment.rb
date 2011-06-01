# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
ShopGuide::Application.initialize!

# haml template options
Haml::Template.options[:format] = :html5
