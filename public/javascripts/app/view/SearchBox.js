/* DO NOT MODIFY. This file was compiled Sun, 19 Jun 2011 16:31:45 GMT from
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
          url: search_producthints_path({
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
        queryDelay: 200,
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
