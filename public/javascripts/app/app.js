/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 01:48:23 GMT from
 * /apps/shop_guide/app/coffeescripts/app/app.coffee
 */

(function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.Loader.setPath({
    AppName: 'app',
    Ext: '/javascripts/lib/extjs/src'
  });
  Ext.require(['Ext.Component', 'Ext.container.Viewport', 'Ext.selection.CheckboxModel', 'Ext.grid.*', 'Ext.data.*']);
  Ext.application({
    name: 'Shop Guide',
    launch: function() {
      return Ext.create('Ext.container.Viewport', {
        xtype: 'panel',
        layout: {
          type: 'vbox',
          align: 'stretch',
          padding: 5
        },
        bodyPadding: 10,
        items: [
          {
            xtype: 'sg-search-combo'
          }, {
            xtype: 'sg-search-grid'
          }
        ]
      });
    }
  });
}).call(this);
