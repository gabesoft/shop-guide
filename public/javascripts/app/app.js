/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 05:37:00 GMT from
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
            xtype: 'search-box'
          }, {
            xtype: 'panel',
            layout: {
              type: 'hbox'
            },
            border: false,
            padding: 0,
            items: [
              {
                xtype: 'category-list',
                flex: 1,
                style: 'margin: 0 10px 0 0',
                border: false
              }, {
                xtype: 'search-results-grid',
                flex: 3
              }
            ]
          }
        ]
      });
    }
  });
}).call(this);
