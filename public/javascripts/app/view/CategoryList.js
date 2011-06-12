/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 06:00:04 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/CategoryList.coffee
 */

(function() {
  Ext.define('SG.view.CategoryList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.category-list',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        fields: ['name'],
        data: [
          {
            name: 'dairy'
          }, {
            name: 'eggs'
          }, {
            name: 'wine'
          }, {
            name: 'baby'
          }, {
            name: 'liquor'
          }
        ]
      });
      Ext.apply(this, {
        store: store,
        title: 'Categories',
        viewConfig: {
          emptyText: 'No categories to display',
          stripeRows: false,
          disableSelection: true,
          trackOver: false
        },
        hideHeaders: true,
        columnLines: false,
        columns: [
          {
            header: '',
            dataIndex: 'name',
            flex: 1,
            renderer: function(value) {
              return Ext.String.format('<a href="#">{0}</a>', value);
            }
          }
        ]
      });
      return this.callParent();
    }
  });
}).call(this);
