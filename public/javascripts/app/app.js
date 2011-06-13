/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 23:40:41 GMT from
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
  Ext.require(['Ext.Component', 'Ext.container.Viewport', 'Ext.selection.CheckboxModel', 'Ext.layout.container.Border', 'Ext.grid.*', 'Ext.data.*']);
  Ext.application({
    name: 'Shop Guide',
    launch: function() {
      var combo, grid, viewport;
      viewport = Ext.create('Ext.container.Viewport', {
        xtype: 'panel',
        id: 'container-panel',
        style: 'background: #fff',
        layout: 'border',
        items: [
          {
            region: 'north',
            xtype: 'search-box',
            border: false,
            split: true,
            margins: '40 450 50 5'
          }, {
            region: 'west',
            border: false,
            xtype: 'category-list',
            margins: '5 5 5 5',
            flex: 1
          }, {
            region: 'center',
            xtype: 'search-results-grid',
            margins: '5 5 250 5',
            flex: 3
          }, {
            region: 'east',
            xtype: 'shopping-list',
            border: false,
            html: 'shopping list',
            margins: '5 5 5 5',
            flex: 1
          }, {
            region: 'south',
            xtype: 'panel',
            html: 'footer'
          }
        ]
      });
      combo = viewport.child('search-box[region=north]');
      grid = viewport.child('search-results-grid[region=center]');
      return combo.on('search', function(query) {
        return grid.loadProducts(query);
      });
    }
  });
}).call(this);
