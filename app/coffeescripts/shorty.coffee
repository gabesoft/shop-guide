$(document).ready ->
  preview = $('#preview-url')
  $('#input-url').keyup ->
    current_value = $.trim @value
    if current_value is ''
      preview.hide().attr 'src', ''
    else
      preview.show().attr 'src', "/#{current_value}"
