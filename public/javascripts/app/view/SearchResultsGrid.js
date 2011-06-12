/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 04:41:47 GMT from
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
        fields: ['name'],
        data: [
          {
            name: 'milk'
          }, {
            name: 'coffee'
          }, {
            name: 'shaving cream'
          }, {
            name: 'shampoo'
          }
        ]
      });
      Ext.apply(this, {
        store: store,
        selModel: selModel,
        columns: [
          {
            text: 'Product',
            dataIndex: 'name'
          }
        ],
        columnLines: true,
        frame: true,
        title: 'Search Results',
        iconCls: 'icon-grid'
      });
      return this.callParent();
    }
  });
}).call(this);
