/* DO NOT MODIFY. This file was compiled Sun, 12 Jun 2011 01:48:23 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/search/GridPanel.coffee
 */

(function() {
  Ext.define('SG.view.search.GridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sg-search-grid',
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
