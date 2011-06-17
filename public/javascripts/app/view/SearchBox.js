/* DO NOT MODIFY. This file was compiled Fri, 17 Jun 2011 05:04:51 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/SearchBox.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ext.define('SG.view.SearchBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.search-box',
    fieldLabel: 'Search Products',
    initComponent: function() {
      var query, store;
      store = Ext.create('Ext.data.Store', {
        model: 'SG.model.Hint',
        proxy: {
          type: 'ajax',
          method: 'GET',
          url: hint_products_path({
            format: 'json'
          }),
          reader: {
            type: 'json'
          }
        }
      });
      Ext.apply(this, {
        autoSelect: false,
        forceSelection: false,
        hideLabel: true,
        hideTrigger: true,
        typeAhead: false,
        minChars: 3,
        store: store,
        emptyText: 'Enter a product, category, or manufacturer',
        queryMode: 'remote',
        displayField: 'name',
        valueField: 'name',
        listConfig: {
          loadingText: 'Searching...',
          emptyText: 'No matching products found'
        }
      });
      this.callParent();
      this.addEvents({
        'search': true
      });
      query = '';
      return this.on('specialKey', __bind(function(field, e) {
        if (e.getKey() === e.ENTER && this.getValue() !== query) {
          query = this.getValue();
          return this.fireEvent('search', query);
        }
      }, this));
    }
  });
}).call(this);
