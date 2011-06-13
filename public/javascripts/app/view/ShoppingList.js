/* DO NOT MODIFY. This file was compiled Mon, 13 Jun 2011 04:05:59 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/ShoppingList.coffee
 */

(function() {
  var __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  Ext.define('SG.view.ShoppingList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.shopping-list',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Product'
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
    },
    addProducts: function(records) {
      var existing, r, selected;
      existing = (function() {
        var _i, _len, _ref, _results;
        _ref = this.store.getRange();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          _results.push(r.data.id);
        }
        return _results;
      }).call(this);
      selected = (function() {
        var _i, _len, _ref, _results;
        _results = [];
        for (_i = 0, _len = records.length; _i < _len; _i++) {
          r = records[_i];
          if (_ref = r.id, __indexOf.call(existing, _ref) < 0) {
            _results.push(r);
          }
        }
        return _results;
      })();
      console.log('existing', existing);
      console.log('selected', selected);
      return this.store.loadData(selected, true);
    }
  });
}).call(this);
