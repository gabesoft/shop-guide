/* DO NOT MODIFY. This file was compiled Sat, 04 Jun 2011 04:39:14 GMT from
 * /apps/shop_guide/app/coffeescripts/shorty.coffee
 */

(function() {
  $(document).ready(function() {
    var preview;
    preview = $('#preview-url');
    return $('#url_url').keyup(function() {
      var current_value;
      current_value = $.trim(this.value);
      if (current_value === '') {
        return preview.hide().attr('src', '');
      } else {
        return preview.show().attr('src', "/" + current_value);
      }
    });
  });
}).call(this);
