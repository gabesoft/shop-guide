/* DO NOT MODIFY. This file was compiled Fri, 10 Jun 2011 19:20:30 GMT from
 * /apps/shop_guide/app/coffeescripts/app.coffee
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
  Ext.require('Ext.container.Viewport');
  Ext.application({
    name: 'Shop Guide',
    launch: function() {
      var searchCombo;
      searchCombo = Ext.create('SG.search.ComboBox');
      return Ext.create('Ext.container.Viewport', {
        xtype: 'panel',
        layout: {
          type: 'vbox',
          align: 'stretch',
          padding: 5
        },
        bodyPadding: 10,
        items: [searchCombo]
      });
    }
  });
}).call(this);
