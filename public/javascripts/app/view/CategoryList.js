/* DO NOT MODIFY. This file was compiled Wed, 22 Jun 2011 05:09:10 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/CategoryList.coffee
 */

(function() {
  Ext.define('SG.view.CategoryList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.category-list',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Category',
        proxy: {
          type: 'ajax',
          method: 'GET',
          url: search_categories_path({
            format: 'json'
          }),
          reader: {
            type: 'json'
          }
        }
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
