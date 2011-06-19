/* DO NOT MODIFY. This file was compiled Sun, 19 Jun 2011 06:01:13 GMT from
 * /apps/shop_guide/app/coffeescripts/app/app.coffee
 */

(function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.Loader.setPath({
    AppName: 'SG',
    Ext: '/javascripts/lib/extjs/src'
  });
  Ext.require(['Ext.Component', 'Ext.data.Model', 'Ext.container.Viewport', 'Ext.selection.CheckboxModel', 'Ext.layout.container.Border', 'Ext.grid.*', 'Ext.data.*']);
  Ext.application({
    name: 'SG',
    controllers: ['Home'],
    launch: function() {
      var viewport;
      return viewport = Ext.create('Ext.container.Viewport', {
        xtype: 'panel',
        id: 'viewport',
        style: 'background: #fff',
        layout: 'border',
        items: [
          {
            region: 'north',
            xtype: 'search-box',
            ref: 'search-box',
            border: false,
            split: true,
            margin: '30 140 25 140'
          }, {
            region: 'west',
            border: false,
            xtype: 'category-list',
            margins: '5 5 5 5',
            flex: 1
          }, {
            region: 'center',
            xtype: 'search-results-grid',
            ref: 'search-grid',
            margins: '5 5 250 5',
            flex: 4
          }, {
            region: 'east',
            xtype: 'shopping-list',
            ref: 'shop-list',
            margins: '5 5 250 5',
            flex: 2
          }, {
            region: 'south',
            xtype: 'panel',
            html: 'footer'
          }
        ]
      });
    }
  });
}).call(this);
