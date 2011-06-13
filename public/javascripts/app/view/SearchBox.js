/* DO NOT MODIFY. This file was compiled Mon, 13 Jun 2011 00:34:22 GMT from
 * /apps/shop_guide/app/coffeescripts/app/view/SearchBox.coffee
 */

(function() {
  Ext.define('SG.view.SearchBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.search-box',
    fieldLabel: 'Search Products',
    initComponent: function() {
      var onSpecialKey, query, store;
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
        hideLabel: false,
        hideTrigger: true,
        typeAhead: false,
        minChars: 3,
        store: store,
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
      onSpecialKey = function(field, e) {
        if (e.getKey() === e.ENTER && this.getValue() !== query) {
          query = this.getValue();
          return this.fireEvent('search', query);
        }
      };
      return this.on('specialKey', onSpecialKey, this);
    }
  });
}).call(this);
