module ApplicationHelper
  def stylesheet_link_extjs
    stylesheet_link_tag "extjs/css/ext-all"
  end

  def javascript_include_extjs
    if Rails.env == 'production'
      javascript_include_tag 'lib/extjs/ext.js'
    else
      javascript_include_tag 'lib/extjs/ext-debug.js'
    end
  end
end
