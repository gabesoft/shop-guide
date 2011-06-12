/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 17:38:36 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/ShoppingList.coffee
 */

(function() {
  Ext.define('SG.view.ShoppingList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.shopping-list',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        fields: ['name'],
        data: [
          {
            name: 'milk'
          }, {
            name: 'eggs'
          }, {
            name: 'wine'
          }, {
            name: 'shampoo'
          }, {
            name: 'vodka'
          }, {
            name: 'shaving cream'
          }, {
            name: 'paper napkins'
          }
        ]
      });
      Ext.apply(this, {
        store: store,
        viewConfig: {
          emptyText: 'No items in the shopping list',
          stripeRows: false,
          disableSelection: true,
          trackOver: false
        },
        hideHeaders: true,
        title: 'Shopping List',
        columnLines: false,
        columns: [
          {
            dataIndex: 'name',
            flex: 1
          }
        ]
      });
      return this.callParent();
    }
  });
}).call(this);
