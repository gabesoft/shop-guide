/* DO NOT MODIFY. This file was compiled Wed, 08 Jun 2011 05:43:03 GMT from
 * /apps/shop_guide/app/coffeescripts/extjs_init.coffee
 */

(function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.Loader.setPath({
    AppName: 'app',
    Ext: '/javascripts/lib/extjs/src'
  });
  Ext.require('Ext.Component');
  Ext.onReady(function() {
    return Ext.create('Ext.Component', {
      renderTo: 'container',
      html: 'Ext-Js Ready'
    });
  });
}).call(this);
