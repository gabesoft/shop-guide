/* DO NOT MODIFY. This file was compiled Sat, 11 Jun 2011 17:09:43 GMT from
 * /apps/shop_guide/app/coffeescripts/app/search/ComboBox.coffee
 */

(function() {
  Ext.define('SG.search.Hint', {
    extend: 'Ext.data.Model',
    fields: [
      {
        name: 'id',
        type: 'string'
      }, {
        name: 'name',
        type: 'string'
      }
    ],
    proxy: {
      type: 'rest',
      method: 'GET',
      url: hint_products_path(),
      reader: {
        type: 'json'
      }
    }
  });
  Ext.define('SG.search.ComboBox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.sg-search-combo',
    initComponent: function() {
      var store;
      store = Ext.create('Ext.data.Store', {
        model: 'SG.search.Hint'
      });
      Ext.apply(this, {
        fieldLabel: 'Search Products',
        hideLabel: false,
        hideTrigger: true,
        typeAhead: false,
        store: store,
        queryMode: 'remote',
        displayField: 'name',
        valueField: 'name',
        width: 200,
        style: 'margin-top:20px',
        listConfig: {
          loadingText: 'Searching...',
          emptyText: 'No matching products found'
        }
      });
      return this.callParent();
    }
  });
}).call(this);
