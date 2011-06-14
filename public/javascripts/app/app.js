/* DO NOT MODIFY. This file was compiled Tue, 14 Jun 2011 04:19:40 GMT from
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
  Ext.require(['Ext.Component', 'Ext.data.Model', 'Ext.container.Viewport', 'Ext.selection.CheckboxModel', 'Ext.layout.container.Border', 'Ext.grid.*', 'Ext.data.*']);
  Ext.application({
    name: 'Shop Guide',
    launch: function() {
      var combo, grid, shoppingList, viewport;
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
            flex: 4
          }, {
            region: 'east',
            xtype: 'shopping-list',
            html: 'shopping list',
            margins: '5 5 250 5',
            flex: 2
          }, {
            region: 'south',
            xtype: 'panel',
            html: 'footer'
          }
        ]
      });
      combo = viewport.child('search-box[region=north]');
      grid = viewport.child('search-results-grid[region=center]');
      shoppingList = viewport.child('shopping-list[region=east]');
      combo.on('search', function(query) {
        return grid.loadProducts(query);
      });
      return grid.on('add-products', function(records) {
        return shoppingList.addProducts(records);
      });
    }
  });
}).call(this);
