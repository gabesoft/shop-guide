/* DO NOT MODIFY. This file was compiled Mon, 13 Jun 2011 00:05:51 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/SearchResultsGrid.coffee
 */

(function() {
  Ext.define('SG.view.SearchResultsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.search-results-grid',
    initComponent: function() {
      var selModel, store;
      selModel = Ext.create('Ext.selection.CheckboxModel', {
        injectCheckbox: 0
      });
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Product'
      });
      Ext.apply(this, {
        store: store,
        selModel: selModel,
        columns: [
          {
            text: 'Product',
            dataIndex: 'name',
            flex: 1
          }, {
            text: 'Tags',
            dataIndex: 'tags'
          }
        ],
        bbar: [
          {
            xtype: 'button',
            text: 'Add to shopping list'
          }
        ],
        columnLines: true,
        frame: true,
        title: 'Search Results',
        iconCls: 'icon-grid'
      });
      return this.callParent();
    },
    loadProducts: function(query) {
      console.log('loading...', query);
      return this.store.load({
        scope: this,
        params: {
          query: query
        },
        callback: function(records, op, success) {
          return console.log(success);
        }
      });
    }
  });
}).call(this);
