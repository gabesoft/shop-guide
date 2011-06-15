module ApplicationHelper
  def stylesheet_link_extjs
    stylesheet_link_tag "/javascripts/lib/extjs/resources/css/ext-all"
  end

  def javascript_include_extjs
    if Rails.env == 'production'
      javascript_include_tag 'lib/extjs/ext.js', 'app-all.js'
    else
      javascript_include_tag 'lib/extjs/ext-debug.js'
    end
  end
end

def javascript_include_app
  base = 'public/javascripts/'
  files = *Dir[base + 'app/**/*.js']
  files.each { |s| s[base] = '' }
  files.delete 'app/sample.js'
  files.insert 0, 'routes'
  javascript_include_tag files
end
