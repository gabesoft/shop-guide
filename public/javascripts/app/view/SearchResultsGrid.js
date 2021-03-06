/* DO NOT MODIFY. This file was compiled Sat, 18 Jun 2011 17:04:09 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/SearchResultsGrid.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ext.define('SG.view.SearchResultsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.search-results-grid',
    initComponent: function() {
      var addButton, selModel, store;
      selModel = Ext.create('Ext.selection.CheckboxModel', {
        injectCheckbox: 0,
        mode: 'MULTI'
      });
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Product',
        proxy: {
          type: 'ajax',
          method: 'GET',
          url: search_products_path({
            format: 'json'
          }),
          reader: {
            type: 'json'
          }
        }
      });
      Ext.apply(this, {
        store: store,
        selModel: selModel,
        columns: [
          {
            text: 'Product',
            dataIndex: 'name',
            flex: 5
          }, {
            text: 'Category',
            dataIndex: 'category',
            flex: 2
          }
        ],
        bbar: [
          {
            xtype: 'button',
            text: 'Add to shopping list',
            ref: 'add-button'
          }
        ],
        columnLines: true,
        frame: true,
        title: 'Search Results',
        iconCls: 'icon-grid'
      });
      this.callParent();
      this.addEvents({
        'addproducts': true
      });
      addButton = this.query('button[ref=add-button]')[0];
      return addButton.on('click', __bind(function() {
        var r, selected;
        selected = (function() {
          var _i, _len, _ref, _results;
          _ref = this.selModel.getSelection();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            r = _ref[_i];
            _results.push(r.data);
          }
          return _results;
        }).call(this);
        return this.fireEvent('addproducts', selected);
      }, this));
    },
    loadProducts: function(query) {
      return this.store.load({
        scope: this,
        params: {
          query: query
        },
        callback: function(records, op, success) {}
      });
    }
  });
}).call(this);
